import { useState } from "react";

export const useItemSelection = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const isSelected = (item) => {
    return selectedItems.some((selectedItem) => selectedItem._id === item._id);
  };

  const onToggleMany = (items) => (e) => {
    const isChecked = e.target.checked;
    setSelectedItems((selectedItems) => {
      if (isChecked) {
        // Add items that are not already selected
        return [...selectedItems, ...items.filter((item) => !isSelected(item))];
      }
      // Remove selected items
      return selectedItems.filter(
        (selectedItem) => !items.some((item) => item._id === selectedItem._id)
      );
    });
  };

  const onToggle = (item) => (e) => {
    const isChecked = e.target.checked;
    setSelectedItems((selectedItems) => {
      if (isChecked) {
        if (isSelected(item)) {
          return selectedItems;
        }
        return [...selectedItems, item];
      }
      return selectedItems.filter((selectedItem) => selectedItem._id !== item._id);
    });
  };

  const onClearSelection = () => setSelectedItems([]);

  // Allow selection of deep-nested checkboxes (e.g.: in trees of tire tests)
  const [registeredItems] = useState(() => new Set());

  // Register an item for selection, when onToggleAll is called, this item will be selected
  const register = (item) => {
    registeredItems.add(item);
  };

  // Unregister an item from selected, when onToggleAll is called, this item will no longer be selected
  // Will do nothing if `register` was not called before
  const unregister = (item) => {
    registeredItems.delete(item);
  };

  // Select or unselect all registered items (registered using the `register` function)
  // This is a callback that can be used on the onChange handler of a checkbox
  const onToggleAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems(Array.from(registeredItems));
    } else {
      setSelectedItems([]);
    }
  };

  // Check if all registered items are selected
  // This can be used to check if the checkbox is in an indeterminate state
  // e.g.: `<input type="checkbox" check={areSomeSelected()} indeterminate={!areAllSelected()} />`
  const areAllSelected = () => {
    return Array.from(registeredItems).every(isSelected);
  };

  // Check if some registered items are selected
  // This can be used to check if the checkbox is checked
  // e.g.: `<input type="checkbox" check={areSomeSelected()} />
  const areSomeSelected = () => {
    return Array.from(registeredItems).some(isSelected);
  };

  return {
    selectedItems,
    register,
    unregister,
    isSelected,
    onToggleMany,
    onToggle,
    onToggleAll,
    onClearSelection,
    areAllSelected,
    areSomeSelected,
  };
};
