'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM;
var HashRouter = _ReactRouterDOM.HashRouter;
var Switch = _ReactRouterDOM.Switch;
var Route = _ReactRouterDOM.Route;
var Link = _ReactRouterDOM.Link;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.addRecipe = _this.addRecipe.bind(_this);
    _this.deleteRecipe = _this.deleteRecipe.bind(_this);
    _this.editRecipe = _this.editRecipe.bind(_this);

    var recipes = JSON.parse(localStorage.getItem('_grymshaw_recipes'));
    _this.state = { recipes: recipes || [] };
    return _this;
  }

  App.prototype.addRecipe = function addRecipe(recipe) {
    recipe.id = this.getUniqueId();
    var recipes = this.state.recipes;
    recipes.push(recipe);
    this.setState({ recipes: recipes });
    localStorage.setItem('_username_recipes', JSON.stringify(this.state.recipes));
  };

  App.prototype.deleteRecipe = function deleteRecipe(recipe) {
    var id = recipe.id;
    var recipes = this.state.recipes;
    var index = recipes.indexOf(recipes.find(function (val) {
      return val.id === id;
    }));
    recipes.splice(index, 1);
    this.setState({ recipes: recipes });
    localStorage.setItem('_username_recipes', JSON.stringify(this.state.recipes));
  };

  App.prototype.editRecipe = function editRecipe(recipe) {
    var id = recipe.id;
    var recipes = this.state.recipes;
    var index = recipes.indexOf(recipes.find(function (val) {
      return val.id === id;
    }));
    recipes.splice(index, 1, recipe);
    this.setState({ recipes: recipes });
    localStorage.setItem('_username_recipes', JSON.stringify(this.state.recipes));
  };

  App.prototype.getUniqueId = function getUniqueId() {
    if (this.uniqueId) {
      return this.uniqueId++;
    } else {
      this.uniqueId = this.state.recipes.reduce(function (acc, val) {
        return Math.max(val.id, acc);
      }, 0);
      this.uniqueId++;
    }
    return this.uniqueId++;
  };

  App.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      HashRouter,
      null,
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { path: '/recipes/new/',
          component: function component(props) {
            return React.createElement(EditItemView, _extends({}, props, {
              isNew: true,
              add: _this2.addRecipe,
              recipes: _this2.state.recipes }));
          } }),
        React.createElement(Route, { path: '/recipes/edit/:id/',
          component: function component(props) {
            return React.createElement(EditItemView, _extends({}, props, {
              add: _this2.editRecipe,
              recipes: _this2.state.recipes }));
          }
        }),
        React.createElement(Route, { path: '/recipes/:id',
          component: function component(props) {
            return React.createElement(ItemView, _extends({}, props, {
              'delete': _this2.deleteRecipe,
              edit: _this2.editRecipe,
              recipes: _this2.state.recipes }));
          } }),
        React.createElement(Route, { path: '/',
          component: function component(props) {
            return React.createElement(ListView, _extends({}, props, {
              'delete': _this2.deleteRecipe,
              recipes: _this2.state.recipes }));
          } })
      )
    );
  };

  return App;
}(React.Component);

var EditItemView = function (_React$Component2) {
  _inherits(EditItemView, _React$Component2);

  function EditItemView(props) {
    _classCallCheck(this, EditItemView);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.addIngredient = _this3.addIngredient.bind(_this3);
    _this3.addStep = _this3.addStep.bind(_this3);
    _this3.handleAddRecipe = _this3.handleAddRecipe.bind(_this3);
    _this3.resetForm = _this3.resetForm.bind(_this3);

    var recipe = undefined;
    if (_this3.props.match.params.id) {
      recipe = _this3.props.recipes.filter(function (val) {
        return val.id === parseInt(_this3.props.match.params.id);
      })[0];
    }
    _this3.state = {
      id: recipe ? recipe.id : undefined,
      name: recipe ? recipe.name : '',
      category: recipe ? recipe.category : '',
      description: recipe ? recipe.description : '',
      ingredients: recipe ? recipe.ingredients : [],
      directions: recipe ? recipe.directions : []
    };
    _this3.initialState = JSON.parse(JSON.stringify(_this3.state));
    return _this3;
  }

  EditItemView.prototype.addIngredient = function addIngredient(ingredient) {
    var ingredients = this.state.ingredients;
    ingredients.push(ingredient);
    this.setState({ ingredients: ingredients });
  };

  EditItemView.prototype.addStep = function addStep(step) {
    var directions = this.state.directions;
    directions.push(step);
    this.setState({ directions: directions });
  };

  EditItemView.prototype.handleAddRecipe = function handleAddRecipe() {
    var recipe = {
      id: this.state.id,
      name: this.refs.name.value,
      category: this.refs.category.value,
      description: this.refs.description.value,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    };
    this.props.add(recipe);
  };

  EditItemView.prototype.resetForm = function resetForm() {
    this.state = this.initialState;
    this.refs.name.value = this.state.name;
    this.refs.category.value = this.state.category;
    this.refs.description.value = this.state.description;
    if (!this.props.isNew) this.handleAddRecipe();
  };

  EditItemView.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      'div',
      { className: 'edit-form' },
      React.createElement(
        'h2',
        { className: 'edit-form-header' },
        'Editar'
      ),
      React.createElement(
        'div',
        { className: 'form-group'  },
        React.createElement(
          'label',
          { htmlFor: 'name' },
          'Idioma'
        ),
        React.createElement('input', { type: 'text', ref: 'name', defaultValue: this.state.name })
      ),

      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'category' },
          'Lugar'
        ),
        React.createElement('input', { type: 'text', ref: 'category', defaultValue: this.state.category })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'description' },
          'Descripción'
        ),
        React.createElement('textarea', { ref: 'description', defaultValue: this.state.description })
      ),

          React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'ingredients' },
          'Tiempo'
        ),
        React.createElement(
          'ul',
          { className: 'ingredients-list' },
          this.state.ingredients.map(function (ingredient, i) {
            return React.createElement(
              'li',
              { key: i },
              React.createElement(
                'span',
                { className: 'ingredient-info' },
                ingredient.quantity
              ),
              React.createElement(
                'span',
                { className: 'ingredient-info' },
                ingredient.unit
              ),
              React.createElement(
                'span',
                { className: 'ingredient-info' },
                ingredient.item
              )
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'ingredients-inputs' },
          React.createElement(
            'div',
            { className: 'inline-group' },
            React.createElement(
              'label',
              { htmlFor: 'ingredient-quantity' },
              '#'
            ),
            React.createElement('input', { className: 'ingredient-field ingredient-quantity', type: 'number', ref: 'ingredientQty' })
          ),
          React.createElement(
            'div',
            { className: 'inline-group' },
            React.createElement(
              'label',
              { htmlFor: 'ingredient-unit' },
              'Años/Meses'
            ),
            React.createElement('input', { className: 'ingredient-field ingredient-unit', type: 'text', ref: 'ingredientUnit' })
          ),
          React.createElement(
            'div',
            { className: 'inline-group' },
            React.createElement(
              'label',
              { htmlFor: 'ingredient-ingredient' },
              'Tags relacionadas (Ej: listen, estructura):'
            ),
            React.createElement('input', { className: 'ingredient-field ingredient-item', type: 'text', ref: 'ingredient' })
          ),
          React.createElement('br', null),
          React.createElement(
            'button',
            { className: 'button button--add-ingredient', onClick: function onClick(e) {
                e.preventDefault();
                _this4.addIngredient({
                  quantity: _this4.refs.ingredientQty.value,
                  unit: _this4.refs.ingredientUnit.value,
                  item: _this4.refs.ingredient.value
                });
              } },
            'Añadir'
          )
        )
      ),

      

      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'directions' },
          'Logros'
        ),
        React.createElement(
          'ol',
          null,
          this.state.directions.map(function (step, i) {
            return React.createElement(
              'li',
              { key: i, className: 'directions-step' },
              step
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'directions-inputs' },
          React.createElement('textarea', { ref: 'directions' }),
          React.createElement(
            'button',
            { className: 'button button--add-step', onClick: function onClick(e) {
                e.preventDefault();
                _this4.addStep(_this4.refs.directions.value);
              } },
            'Añadir Logro'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'submit-buttons' },
        React.createElement(
          'button',
          { className: 'button button--cancel', type: 'button',
            onClick: function onClick() {
              _this4.resetForm();
              _this4.props.history.goBack();
            } },
          'Cancel'
        ),
        React.createElement(
          'button',
          { className: 'button button--save', type: 'submit',
            onClick: function onClick() {
              _this4.handleAddRecipe();
              _this4.props.history.push('/');
            } },
          'Save Recipe'
        )
      )
    );
  };

  return EditItemView;
}(React.Component);

var ItemView = function (_React$Component3) {
  _inherits(ItemView, _React$Component3);

  function ItemView() {
    _classCallCheck(this, ItemView);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  ItemView.prototype.render = function render() {
    var _this6 = this;

    var recipe = this.props.recipes.filter(function (val) {
      return val.id === parseInt(_this6.props.match.params.id);
    })[0];
    console.log(recipe);
    return React.createElement(
      'div',
      { className: 'recipe-container' },
      React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
          'h2',
          { className: 'recipe-header' },
          recipe.name,
          React.createElement(
            'span',
            { className: 'recipe-subheader' },
            recipe.category
          )
        ),
        React.createElement(
          'div',
          { className: 'recipe-actions' },
          React.createElement(
            Link,
            { className: 'recipe-action edit', to: '/recipes/edit/' + recipe.id },
            'Edit'
          ),
          React.createElement(
            'span',
            { className: 'recipe-action delete',
              onClick: function onClick() {
                _this6.props.delete(recipe);
                _this6.props.history.push('/');
              } },
            'Delete'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'recipe-info' },
        React.createElement(ItemDescription, { data: recipe.description }),
        React.createElement(ItemIngredients, { data: recipe.ingredients }),
        React.createElement(ItemDirections, { data: recipe.directions })
      ),
      React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
          Link,
          { className: 'recipe-action back', to: '/' },
          'Back'
        )
      )
    );
  };

  return ItemView;
}(React.Component);

var ListView = function (_React$Component4) {
  _inherits(ListView, _React$Component4);

  function ListView(props) {
    _classCallCheck(this, ListView);

    var _this7 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this7.state = {
      recipes: _this7.props.recipes
    };
    return _this7;
  }

  ListView.prototype.render = function render() {
    var _this8 = this;

    var recipes = this.state.recipes;
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'list-headline' },
        React.createElement(
          'h2',
        ),
        React.createElement(
          Link,
          { to: '/recipes/new/', className: 'button button--add-recipe' },
          'Añadir más'
        )
      ),
      React.createElement(
        'ol',
        { className: 'list' },
        recipes.map(function (recipe, i) {
          return React.createElement(ListItem, { key: i, recipe: recipe, 'delete': _this8.props.delete });
        })
      )
    );
  };

  return ListView;
}(React.Component);

var ListItem = function (_React$Component5) {
  _inherits(ListItem, _React$Component5);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  ListItem.prototype.render = function render() {
    var _this10 = this;

    var recipe = this.props.recipe;
    return React.createElement(
      'li',
      { className: 'list-item' },
      React.createElement(
        'div',
        { className: 'li-inner' },
        React.createElement(
          Link,
          { to: '/recipes/' + recipe.id },
          React.createElement(
            'h2',
            { className: 'item-header' },
            recipe.name
          )
        ),
        React.createElement(
          'div',
          { className: 'recipe-actions' },
          React.createElement(
            Link,
            { className: 'recipe-action', to: '/recipes/edit/' + recipe.id + '/' },
            'Edit'
          ),
          '|',
          React.createElement(
            'span',
            { className: 'recipe-action', onClick: function onClick() {
                _this10.props.delete(recipe);
              } },
            'Delete'
          )
        ),
        React.createElement(
          'p',
          { className: 'item-summary' },
          recipe.description
        )
      )
    );
  };

  return ListItem;
}(React.Component);

var ItemDescription = function (_React$Component6) {
  _inherits(ItemDescription, _React$Component6);

  function ItemDescription() {
    _classCallCheck(this, ItemDescription);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  ItemDescription.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'recipe-section' },
      React.createElement(SectionHeader, { text: 'Descripción' }),
      React.createElement(
        'p',
        { className: 'section-text' },
        this.props.data
      )
    );
  };

  return ItemDescription;
}(React.Component);

var ItemIngredients = function (_React$Component7) {
  _inherits(ItemIngredients, _React$Component7);

  function ItemIngredients() {
    _classCallCheck(this, ItemIngredients);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  ItemIngredients.prototype.render = function render() {
    var data = this.props.data;
    return React.createElement(
      'div',
      { className: 'recipe-section recipe-section--ingredients' },
      React.createElement(SectionHeader, { text: 'Tiempo' }),
      React.createElement(
        'ul',
        null,
        data.map(function (ingredient, i) {
          return React.createElement(
            'li',
            { key: i },
            React.createElement(
              'span',
              { className: 'ingredient-quantity' },
              ingredient.quantity
            ),
            React.createElement(
              'span',
              { className: 'ingredient-unit' },
              ingredient.unit
            ),
            React.createElement(
              'span',
              { className: 'ingredient-item' },
              ingredient.item
            )
          );
        })
      )
    );
  };

  return ItemIngredients;
}(React.Component);

var ItemDirections = function (_React$Component8) {
  _inherits(ItemDirections, _React$Component8);

  function ItemDirections() {
    _classCallCheck(this, ItemDirections);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  ItemDirections.prototype.render = function render() {
    var data = this.props.data;
    return React.createElement(
      'div',
      { className: 'recipe-section' },
      React.createElement(SectionHeader, { text: 'Logros' }),
      React.createElement(
        'ol',
        null,
        data.map(function (step, i) {
          return React.createElement(
            'li',
            { key: i, className: 'directions-step' },
            step
          );
        })
      )
    );
  };

  return ItemDirections;
}(React.Component);

var SectionHeader = function (_React$Component9) {
  _inherits(SectionHeader, _React$Component9);

  function SectionHeader() {
    _classCallCheck(this, SectionHeader);

    return _possibleConstructorReturn(this, _React$Component9.apply(this, arguments));
  }

  SectionHeader.prototype.render = function render() {
    return React.createElement(
      'h3',
      { className: 'section-header' },
      this.props.text
    );
  };

  return SectionHeader;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));