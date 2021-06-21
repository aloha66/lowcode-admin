import React, { FC, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import type { FlattenItem, PageProps, EditorModelState } from '../../types';
import {
  copyItem,
  getKeyFromUniqueId,
  dropItem,
  isObject,
} from '../../utils/utils';
import './Wrapper.less';

interface WrapperProps {
  $id: string;
  item: FlattenItem;
  inside?: boolean;
  style?: {};
}

const Wrapper: FC<WrapperProps> = ({
  $id,
  item,
  inside = false,
  children,
  style,
}) => {
  const dispatch = useDispatch();
  const editor = useSelector<PageProps, EditorModelState>(
    (state: PageProps) => state.editor,
  );
  const { flatten, selected, hovering } = editor;
  const { schema } = item;
  const { type } = schema;

  const [position, setPosition] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: 'box',
    item: { $id: inside ? 0 + $id : $id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      // 如果 children 已经作为了 drop target，不处理

      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      const [newFlatten, newId] = dropItem({
        dragId: item.$id, // 内部拖拽用dragId
        dragItem: item.dragItem, // 从左边栏过来的，用dragItem
        dropId: $id,
        position,
        flatten,
      });
      console.log('item', newFlatten, newId);

      dispatch({ type: 'editor/onFlattenChange', payload: { newFlatten } });
      dispatch({ type: 'editor/setSelected', payload: newId });
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        // Determine rectangle on screen
        const hoverBoundingRect = boxRef.current?.getBoundingClientRect() ?? {
          bottom: 0,
          top: 0,
        };
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        const dragOffset = monitor.getSourceClientOffset() ?? { y: 0, top: 0 };
        // Get pixels to the top
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (inside) {
          setPosition('inside');
        } else {
          if (hoverClientY <= hoverMiddleY) {
            setPosition('up');
          }
          // Dragging upwards
          if (hoverClientY > hoverMiddleY) {
            setPosition('down');
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  dragPreview(dropRef(boxRef));

  const handleClick = (e) => {
    e.stopPropagation();
    const _id = inside ? '0' + $id : $id;
    dispatch({ type: 'editor/setSelected', payload: _id });
  };

  const deleteItem = (e) => {
    e.stopPropagation();
    const newFlatten = { ...flatten };
    let newSelect = '#';
    // 计算删除后新被选中的元素：
    // 1. 如果是第一个，选第二个
    // 2. 如果不是第一，选它前一个
    // 3. 如果同级元素没了，选parent
    try {
      const parent = newFlatten[$id].parent;
      const siblings = newFlatten[parent].children;
      const idx = siblings.indexOf($id);
      if (idx > 0) {
        newSelect = siblings[idx - 1];
      } else {
        newSelect = siblings[1] || parent;
      }
    } catch (error) {
      console.log('catch', error);
    }
    delete newFlatten[$id];
    // TODO 状体管理
    // onFlattenChange(newFlatten);
    // setGlobal({ selected: newSelect });
  };

  const handleItemCopy = (e) => {
    e.stopPropagation();
    const [newFlatten, newId] = copyItem(flatten, $id);
    // TODO 状体管理
    // onFlattenChange(newFlatten);
    // setGlobal({ selected: newId });
  };

  // 一些computed
  let isSelected = selected === $id && !inside;
  if (selected && selected[0] === '0') {
    isSelected = selected.substring(1) === $id && inside;
  }

  const hoverId = inside ? '0' + $id : $id;

  let overwriteStyle = {
    backgroundColor: hovering === hoverId ? '#ecf5ff' : '#fff',
    opacity: isDragging ? 0 : 1,
  };

  if (inside) {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      // marginLeft: 12,
      padding: '12px 12px 0',
      backgroundColor: '#f6f5f6',
    };
  } else if ($id === '#') {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      padding: 12,
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#f6f5f6',
    };
  } else if (type === 'object') {
    overwriteStyle = { ...overwriteStyle, paddingTop: 12 };
  }

  if (isActive) {
    if (inside) {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 -3px 0 red',
      };
    } else if (position === 'up') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 -3px 0 red',
      };
    } else if (position === 'down') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 3px 0 red',
      };
    }
  }

  if (isSelected) {
    overwriteStyle = {
      ...overwriteStyle,
      outline: '2px solid #409eff',
      borderColor: '#fff',
      zIndex: 1,
    };
  }
  if (style && typeof style === 'object') {
    overwriteStyle = {
      ...overwriteStyle,
      ...style,
    };
  }

  if ($id === '#' && inside) return <div>{children}</div>;

  // 展示的id
  const shownId = getKeyFromUniqueId(schema.$id);

  // 操作按钮
  const _controlButtons = [true, true];
  const _showDefaultBtns = _controlButtons
    .filter((item) => ['boolean', 'function'].includes(typeof item))
    .map((item) => {
      if (typeof item === 'boolean') return item;
      return item(schema);
    });
  const _extraBtns = _controlButtons.filter(
    (item) => isObject(item) && item.text,
  );
  const { length: _numOfBtns } = _showDefaultBtns
    .concat(_extraBtns)
    .filter(Boolean);

  return (
    <div
      ref={boxRef}
      style={overwriteStyle}
      className="field-wrapper relative w-100"
      onClick={handleClick}
    >
      {children}

      {!inside && $id !== '#' && (
        <div className="absolute top-0 right-1 blue f7">{shownId}</div>
      )}

      {!inside && $id !== '#' && isSelected && (
        <div className="pointer-move" ref={dragRef}>
          <DragOutlined />
        </div>
      )}

      {!inside && $id !== '#' && isSelected && _numOfBtns > 0 && (
        <div className="pointer-wrapper">
          {_showDefaultBtns[0] !== false && (
            <div className="pointer" onClick={deleteItem}>
              <DeleteOutlined />
            </div>
          )}
          {_showDefaultBtns[1] !== false && (
            <div className="pointer" onClick={handleItemCopy}>
              <CopyOutlined />
            </div>
          )}
          {_extraBtns.map((item, idx) => {
            return (
              <div
                key={idx.toString()}
                className="pointer"
                onClick={(e) => item.onClick && item.onClick(e, schema)}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wrapper;
