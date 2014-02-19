apostrophe-raphael
==================

### *proof of concept!* 

Apostrophe's solution for simple vector maps. Subclasses apostrophe-snippets. Uses raphael.js.

## Usage
Make sure you have the module installed in and required by your project:
```
npm install apostrophe-raphael --save
```

Now, in app.js when you're setting up your modules, simply add 'apostrophe-raphael' to the modules object.

```javascript
modules: {
  'apostrophe-ui-2': { },
  'apostrophe-editor-2': { },
  'apostrophe-raphael': { },
  // ... and so on
}
```
And then make sure the 'raphael' page type is added with the others. It should look something like this:

```javascript
pages: {
  types: [
    { name: 'default', label: 'Default (Two Column)' },
    { name: 'blog', label: 'Blog' },
    { name: 'raphael', label: 'US Map' }
  ]
}
```

Lastly, add the menu to the Apostrophe admin bar so our content can be edited. In views/global/outerLayout.html, include aposRaphaelMenu with the other menu calls:

```html
{{ aposPagesMenu({ page: page, edit: edit }) }}

<!-- right in here -->
{{ aposRaphaelMenu(permissions) }}
          
{{ aposPeopleMenu(permissions) }}
{{ aposGroupsMenu(permissions) }}
{{ aposMediaMenu({ edit: permissions.guest })}}
{{ aposTagsMenu({ edit: permissions.admin }) }}
```


### Map Types
By default, apostrophe-raphael renders a map of the United States but that's easy to change! You can pass a mapType option to the module. You'll probably also want to change the label and icon accordingly.

```javascript
'apostrophe-raphael': {
  mapType: 'world',
  label: 'World Map',
  icon: 'globe',
}
```