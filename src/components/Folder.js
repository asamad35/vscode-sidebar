import { useState } from "react";

export default function Folder({
  data,
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode
}) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: false
  });
  const [renameInput, setRenameInput] = useState({
    isVisible: false,
    value: ""
  });

  function handleAddInput(e) {
    if (e.keyCode !== 13 || e.target.value === "") return;
    const nodeObj = {
      id: Date.now(),
      name: e.target.value,
      isFolder: showInput.isFolder,
      items: []
    };
    handleInsertNode(data.id, nodeObj);
    setShowInput({ ...showInput, isVisible: false });
  }
  function handleRenameInput(e) {
    if (e.keyCode !== 13 || e.target.value === "") return;

    handleRenameNode(data.id, e.target.value);
    setRenameInput({ ...renameInput, isVisible: false });
  }

  if (data.isFolder) {
    return (
      <div className="pl-8">
        <div className="cursor-pointer">
          <div className=" flex bg-gray-400 items-center p-1 gap-4 my-1">
            <span
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <span>📁</span>
              {!renameInput.isVisible && data.name}
            </span>
            {renameInput.isVisible && (
              <input
                autoFocus
                type="text"
                className="border-2 border-black rounded-xl pl-2"
                onKeyDown={handleRenameInput}
                value={renameInput.value}
                onBlur={() => {
                  setRenameInput({ ...renameInput, isVisible: false });
                }}
                onChange={e => {
                  setRenameInput({ ...renameInput, value: e.target.value });
                }}
              />
            )}
            <button
              onClick={() => {
                setShowInput({ isVisible: true, isFolder: true });
                setExpanded(true);
              }}
              className="bg-gray-800 text-white rounded-xl px-2"
            >
              + folder
            </button>
            <button
              onClick={e => {
                setShowInput({ isVisible: true, isFolder: false });
                setExpanded(true);
              }}
              className="bg-gray-800 text-white rounded-xl py-1 px-2"
            >
              + file
            </button>
            <button
              onClick={() => {
                handleDeleteNode(data.id);
              }}
              className="bg-gray-800 text-white rounded-xl py-1 px-2"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setRenameInput({
                  ...renameInput,
                  isVisible: true,
                  value: data.name
                });
              }}
              className="bg-gray-800 text-white rounded-xl py-1 px-2"
            >
              Rename
            </button>
          </div>
          <div>
            {showInput.isVisible && (
              <>
                <span className=" ml-8">
                  {showInput.isFolder ? "📁" : "️️🗃️"}
                </span>
                <input
                  className="border-2 border-black rounded-xl ml-1 pl-2"
                  autoFocus
                  type="text"
                  onKeyDown={handleAddInput}
                  onBlur={() =>
                    setShowInput({ ...showInput, isVisible: false })
                  }
                />
              </>
            )}
          </div>
        </div>
        <div className={expanded ? "block" : "hidden"}>
          {data.items.map(el => (
            <Folder
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
              handleRenameNode={handleRenameNode}
              data={el}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="pl-8 my-2 flex gap-4 items-center">
        <span>🗃️ {!renameInput.isVisible && data.name} </span>
        {renameInput.isVisible && (
          <input
            autoFocus
            type="text"
            className="border-2 border-black rounded-xl  pl-2"
            onKeyDown={handleRenameInput}
            value={renameInput.value}
            onBlur={() => {
              setRenameInput({ ...renameInput, isVisible: false });
            }}
            onChange={e => {
              setRenameInput({ ...renameInput, value: e.target.value });
            }}
          />
        )}
        <button
          onClick={() => {
            handleDeleteNode(data.id);
          }}
          className="bg-gray-800 text-white rounded-xl py-1 px-2"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setRenameInput({
              ...renameInput,
              isVisible: true,
              value: data.name
            });
          }}
          className="bg-gray-800 text-white rounded-xl py-1 px-2"
        >
          Rename
        </button>
      </div>
    );
  }
}
