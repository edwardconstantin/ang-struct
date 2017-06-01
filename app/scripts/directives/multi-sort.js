/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

/*
Like angular orderBy filter, but allows reversing each parameter individually (even getters)
 */
angular.module('smart-table').filter('multiOrderBy', function () {
  //return require('orderby');

  var compareProperty, dot;

  dot = {
    get: function (obj, field) {
      var i, key, keys, len, value;
      keys = field.split('.');
      value = obj;
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        value = value[key];
      }
      return value;
    },
    set: function (obj, field, setValue) {
      var allButLastKey, i, key, keys, lastKey, len, value;
      keys = field.split('.');
      allButLastKey = keys.slice(0, -1);
      lastKey = keys[keys.length - 1];
      value = obj;
      for (i = 0, len = allButLastKey.length; i < len; i++) {
        key = allButLastKey[i];
        value = value[key] != null ? value[key] : value[key] = {};
      }
      return value[lastKey] = setValue;
    }
  };

  compareProperty = function (predicate, reverse) {
    var getter;
    getter = typeof predicate === 'function' ? function (obj) {
      return predicate(obj);
    } : function (obj) {
      return dot.get(obj, predicate);
    };
    getter;
    if (!reverse) {
      return function (a, b) {
        if (getter(a) < getter(b)) {
          return -1;
        } else if (getter(a) > getter(b)) {
          return 1;
        } else {
          return 0;
        }
      };
    } else {
      return function (a, b) {
        if (getter(a) > getter(b)) {
          return -1;
        } else if (getter(a) < getter(b)) {
          return 1;
        } else {
          return 0;
        }
      };
    }
  };

  return function (collection, expressions) {
    return collection.sort(function (a, b) {
      var expression, i, len, predicate, reverse, value;
      for (i = 0, len = expressions.length; i < len; i++) {
        expression = expressions[i];
        if (typeof expression === 'object') {
          predicate = expression.predicate;
          reverse = expression.reverse;
        } else {
          predicate = expression;
        }
        value = compareProperty(predicate, reverse)(a, b);
        if (value !== 0) {
          return value;
        }
      }
    });
  };

})

/*
Generate unique ids to identify each sortable element on the page
 */
.factory('stUniqueId', function () {
  var id;
  id = 0;
  return {
    generate: function () {
      return id++;
    }
  };
})

/*
Service to manage shift clicks on elements
 */

.factory('stShiftSort', function () {

  var indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };
  var clickedElements;
  clickedElements = [];

  return {
    getIndex: function (elementId) {
      return clickedElements.indexOf(elementId) + 1;
    },
    clickElement: function (elementId) {
      if (indexOf.call(clickedElements, elementId) < 0) {
        return clickedElements.push(elementId);
      }
    },
    clear: function () {
      return clickedElements.length = 0;
    }
  };
})



.directive('stMultiSort', [
  'stConfig', '$parse', '$rootScope', 'stUniqueId', 'stShiftSort',
  function (stConfig, $parse, $rootScope, stUniqueId, stShiftSort) {
    return {
      restrict: 'A',
      require: '^stTable',
      link: function (scope, element, attr, ctrl) {
        var classAscent, classDescent, elementId, getter, index, predicate, sort, sortDefault, stateClasses;
        predicate = attr.stMultiSort;
        getter = $parse(predicate);
        index = 0;
        classAscent = attr.stClassAscent || stConfig.sort.ascentClass;
        classDescent = attr.stClassDescent || stConfig.sort.descentClass;
        stateClasses = [classAscent, classDescent];
        sortDefault = void 0;
        elementId = stUniqueId.generate();

        /*
        Use our custom orderBy filter, which supports reversing rows independently
         */
        ctrl.setSortFunction('multiOrderBy');

        /*
        Sort the rows.
        @param {Boolean} holdingShiftKey
         */
        sort = function (holdingShiftKey) {
          var base, reverse, tableState;
          index++;
          tableState = ctrl.tableState();
          if ((base = tableState.sort).predicate == null) {
            base.predicate = [];
          }
          reverse = index % 2 === 0;
          predicate = angular.isFunction(getter(scope)) ? getter(scope) : attr.stMultiSort;
          (function () {
            var indexOfExistingSort;
            indexOfExistingSort = (function () {
              var i, ref, sortConfig;
              ref = ctrl.tableState().sort.predicate;
              for (i in ref) {
                sortConfig = ref[i];
                if (sortConfig.elementId === elementId) {
                  return i;
                }
              }
              return -1;
            })();
            if (indexOfExistingSort !== -1) {
              return tableState.sort.predicate.splice(indexOfExistingSort, 1);
            }
          })();
          (function () {
            index = index % 2 === 0 ? 2 : 1;
            element.removeClass(stateClasses[index % 2]).addClass(stateClasses[index - 1]);
            if (!holdingShiftKey) {
              return $rootScope.$broadcast('clearOtherSortClasses', elementId);
            }
          })();
          tableState.sort.predicate.splice(stShiftSort.getIndex(elementId), 0, {
            elementId: elementId,
            predicate: predicate,
            reverse: reverse === true
          });
          tableState.pagination.start = 0;
          return ctrl.pipe();
        };
        if (attr.stSortDefault) {
          sortDefault = scope.$eval(attr.stSortDefault) != null ? scope.$eval(attr.stSortDefault) : attr.stSortDefault;
        }
        if (sortDefault) {
          index = sortDefault === 'reverse' ? 1 : 0;
          sort();
        }
        element.bind('click', function (e) {
          if (!predicate) {
            return;
          }
          if (e.shiftKey) {
            stShiftSort.clickElement(elementId);
          } else {
            stShiftSort.clear();
          }
          return scope.$apply(function () {
            return sort(e.shiftKey);
          });
        });
        return scope.$on('clearOtherSortClasses', function (e, sortedElementId) {
          if (sortedElementId !== elementId) {
            index = 0;
            return element.removeClass(classAscent).removeClass(classDescent);
          }
        });
      }
    };
  }
]);
