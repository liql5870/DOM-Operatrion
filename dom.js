window.dom = {
    create(string) {
      //创建元素
      const container = document.createElement("template");
      container.innerHTML = string.trim();
      return container.content.firstChild;
    },
    after(node, node2) {
      //把node2新增在node后面
      node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
      //把node2新增在node之前
      node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
      //用于新增儿子
      parent.appendChild(node);
    },
    wrap(node, parent) {
      //新增爸爸
      //想把爸爸放到儿子前面，再把儿子移到爸爸后面
      dom.before(node, parent);
      dom.append(parent, node);
    },
  
    //---------------------------------删除接口------------------------------------
    remove(node) {
      //删除1：用节点的爸爸，删除他的儿子
      node.parentNode.removeChild(node);
      return node;
    },
    empty(node) {
      //干掉所有儿子
      const { childNodes } = node;
      const array = [];
      let x = node.firstChild;
      while (x) {
        array.push(dom.remove(node.firstChild));
        x = node.firstChild;
      }
    },
    //-----------------------------------修改接口----------------------------------
    attr(node, name, value) {
      //修改属性,获得属性
      //根据参数个数，运行不同的代码 就是重载
      if (arguments.length === 3) {
        node.setAttribute(name, value);
      } else if (arguments.length === 2) {
        return node.getAttribute(name);
      }
    },
    text(node, string) {
      //修改内容
      //适配
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    },
    html(node, string) {
      //读和写HTML内容
      if (arguments.length === 2) {
        node.innerHTML = string;
      } else if (arguments.length === 1) {
        return node.innerHTML;
      }
    },
    style(node, name, value) {
      if (arguments.length === 3) {
        //dom.style(div,'color','red')
        node.style[name] = value;
      } else if (arguments.length === 2) {
        if (typeof name === "string") {
          //dom.style(div,'color')
          return node.style[name];
        } else if (name instanceof Object) {
          //dom.style(div,{color:'red'})
          const Object = name;
          for (let key in name) {
            node.style[key] = name[key];
          }
        }
      }
    },
    //------------------------------操作class对象----------------------------------
    class: {
      add(node, className) {
        node.classList.add(className);
      },
      remove(node, className) {
        node.classList.remove(className);
      },
      has(node, className) {
        return node.classList.contains(className);
      },
    },
    on(node, eventName, fn) {
      node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
      node.removeEventListener(eventName, fn);
    },
    //-----------------------------------查询接口------------------------------
    find(selector, scope) {
      //scope参数表示查询的范围
      //如果不给范围,默认就在document里面找
      return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
      //寻找爸爸节点
      return node.parentNode;
    },
    children(node) {
      return node.children;
    },
    siblings(node) {
      //寻找兄弟节点
      return Array.from(node.parentNode.children).filter((n) => n !== node);
    },
    next(node) {
      //查找下一个节点
      let x = node.nextSibling;
      while (x && x.nodeType === 3) {
        x = x.nextSibling;
      }
      return x;
    },
    previous(node) {
      //查找上一个节点
      let x = node.previousSibling;
      while (x && x.nodeType === 3) {
        x = x.previousSibling;
      }
      return x;
    },
    each(nodeList, fn) {
      //遍历所有节点，并对这些节点进行操作
      for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i]);
      }
    },
    index(node) {
      const list = dom.children(node.parentNode);
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === node) {
          break;
        }
      }
      return "排行第" + (i + 1);
    },
  };