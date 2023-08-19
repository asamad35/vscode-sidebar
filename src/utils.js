export function insertNode(data, parentId, nodeObj) {
  if (data.id === parentId) {
    data.items.unshift(nodeObj);
    return data;
  }
  const latestNode = data.items.map(el => {
    return insertNode(el, parentId, nodeObj);
  });

  return { ...data, items: latestNode };
}

export function deleteNode(data, parentNodeId, childNodeId) {
  let updatedItems = [];
  if (data.id === parentNodeId) {
    updatedItems = data.items.filter(el => el.id !== childNodeId);
  } else {
    updatedItems = data.items.map(el => {
      return deleteNode(el, parentNodeId, childNodeId);
    });
  }
  return { ...data, items: updatedItems };
}
export function renameNode(data, parentNodeId, childNodeId, newName) {
  let updatedItems = [];
  if (data.id === parentNodeId) {
    updatedItems = data.items.map(item => {
      if (item.id !== childNodeId) return item;
      else {
        item.name = newName;
        return item;
      }
    });
  } else {
    updatedItems = data.items.map(el =>
      renameNode(el, parentNodeId, childNodeId, newName)
    );
  }

  return { ...data, items: updatedItems };
}

export function findParentId(data, childId) {
  if (data.items?.findIndex(el => el.id == childId) > -1) {
    return data.id;
  } else {
    if (data.items) {
      for (const item of data.items) {
        return findParentId(item, childId);
      }
    } else return null;
  }
}
