import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

*, :after, :before {
    box-sizing: border-box;
}
 #root, body, html {
    height: 100%;
    overflow: hidden;
}

ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.ant-tabs-left.editorTabclass 
.ant-tabs-nav , .ant-tabs-left.editorTabclass .ant-tabs-nav-list{
  width: 40px!important;
  min-width: 40px!important;
}

.ant-tabs.editorTabclass {
    height: 100%;

    .ant-tabs-content {
      height: 100%;
    }
}

.ant-tabs-nav , .ant-tabs-left.editorTabclass .ant-tabs-tab {
    padding: 0 !important;
}

.ant-tabs-nav , .ant-tabs-left.editorTabclass .ant-tabs-tab .anticon {
    margin-right: 0 !important;
}

.ant-tabs-nav , .ant-tabs-left.editorTabclass .ant-tabs-tabpane {
    padding-left: 0 !important;
}
/* .ant-tabs-left.editorTabclass{
  height: 100%;
}

.ant-tabs-left.editorTabclass > .ant-tabs-nav .ant-tabs-tab{
  padding:20px 0px !important;
 
}
.ant-tabs-left.editorTabclass .ant-tabs-tab{
  margin:auto!important;
} */
/* .ant-tabs-left.editorTabclass .ant-tabs-tab   div{
  display: inline-block;
}
.ant-tabs-left.editorTabclass .ant-tabs-content-holder{
  overflow: auto;
  padding:8px;
}
.ant-tabs-left.editorTabclass .ant-tabs-tabpane{
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px!important;
  padding-right: 10px!important;
  padding-bottom: 40px;
} */

`;
