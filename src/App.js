import React, { useState } from "react";
import Folder from "./components/Folder";
import data from "./data/data.js";
import { deleteNode, findParentId, insertNode, renameNode } from "./utils";

function App() {
  const [sidebarData, setSidebarData] = useState(data);

  const handleInsertNode = (parentId, nodeObj) => {
    const newSidebarData = insertNode(sidebarData, parentId, nodeObj);
    setSidebarData(newSidebarData);
  };

  const handleDeleteNode = childNodeId => {
    const parentNodeId = findParentId(sidebarData, childNodeId);
    const newSidebarData = deleteNode(sidebarData, parentNodeId, childNodeId);
    setSidebarData(newSidebarData);
  };

  const handleRenameNode = (childNodeId, newName) => {
    const parentNodeId = findParentId(sidebarData, childNodeId);
    console.log(parentNodeId);
    const newSidebarData = renameNode(
      sidebarData,
      parentNodeId,
      childNodeId,
      newName
    );
    setSidebarData(newSidebarData);
  };
  return (
    <div className="">
      <Folder
        data={sidebarData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  );
}

export default App;
