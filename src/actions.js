export function clickOutside(node) {
    const handleClick = (event) => {        
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent("outclick"));
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
}

export function selectOnFocus(node) {
    if (node && typeof node.select === 'function' ) {               // make sure node is defined and has a select() method
      const onFocus = (event) => node.select()                      // event handler

      node.addEventListener('focus', onFocus)                       // when node gets focus call onFocus()

      return {
        destroy: () => node.removeEventListener('focus', onFocus)   // this will be executed when the node is removed from the DOM
      }
    }
  }