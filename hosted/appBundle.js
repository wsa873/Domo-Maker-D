/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("/* Takes in an error message. Sets the error message up in html, and\r\n   displays it to the user. Will be hidden by other events that could\r\n   end in an error.\r\n*/\nconst handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\n\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nconst hideError = () => {\n  document.getElementById('domoMessage').classList.add('hidden');\n};\n\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/maker.jsx":
/*!**************************!*\
  !*** ./client/maker.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\n\nconst handleDomo = e => {\n  e.preventDefault();\n  helper.hideError();\n  const name = e.target.querySelector('#domoName').value;\n  const age = e.target.querySelector('#domoAge').value;\n  const color = e.target.querySelector('#domoColor').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!name || !age || !color) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendPost(e.target.action, {\n    name,\n    age,\n    color,\n    _csrf\n  }, loadDomosFromServer);\n  return false;\n};\n\nconst DomoForm = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"domoForm\",\n    name: \"domoForm\",\n    onSubmit: handleDomo,\n    action: \"/maker\",\n    method: \"POST\",\n    className: \"domoForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"name\"\n  }, \"Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"domoName\",\n    type: \"text\",\n    name: \"name\",\n    placeholder: \"Domo Name\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"age\"\n  }, \"Age: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"domoAge\",\n    type: \"number\",\n    min: \"0\",\n    name: \"age\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makeDomoSubmit\",\n    type: \"submit\",\n    value: \"Make Domo\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"color\"\n  }, \"Body Color: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"domoColor\",\n    type: \"text\",\n    name: \"color\",\n    placeholder: \"Domo Color\"\n  }));\n};\n\nconst DomoList = props => {\n  if (props.domos.length === 0) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"domoList\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"emptyDomo\"\n    }, \"No Domos Yet!\"));\n  }\n\n  const domoNodes = props.domos.map(domo => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: domo._id,\n      className: \"domo\"\n    }, /*#__PURE__*/React.createElement(\"img\", {\n      src: \"/assets/img/domoface.jpeg\",\n      alt: \"domo face\",\n      className: \"domoFace\"\n    }), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"domoName\"\n    }, \"Name: \", domo.name, \" \"), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"domoAge\"\n    }, \"Age: \", domo.age), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"domoColor\"\n    }, \"Color: \", domo.color));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"domoList\"\n  }, /*#__PURE__*/React.createElement(\"h2\", {\n    id: \"domoCount\"\n  }, props.domos.length, \" domos have been created so far.\"), domoNodes);\n};\n\nconst loadDomosFromServer = async () => {\n  const response = await fetch('/getDomos');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {\n    domos: data.domos\n  }), document.getElementById('domos'));\n};\n\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {\n    csrf: data.csrfToken\n  }), document.getElementById('makeDomo'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {\n    domos: []\n  }), document.getElementById('domos'));\n  loadDomosFromServer();\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/maker.jsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/maker.jsx");
/******/ 	
/******/ })()
;