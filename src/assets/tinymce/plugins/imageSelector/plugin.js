tinymce.PluginManager.add('imageSelector', function(editor, url) {
    var pluginName='图片上传';

    var doAct = function() {
        editor.settings.imageSelectorCallback(function(r){
            console.log('inserting image to editor: '+ r);
            editor.execCommand('mceInsertContent', false, '<img alt="Smiley face" height="42" width="42" src="' + r + '"/>');
        });
    }
    // Add a button that opens a window
    editor.ui.registry.addToggleButton('imageSelector', {
        icon: 'image',
        tooltip:"select image from image lib",
        onAction: function () {
            doAct()
        }
    });

    editor.ui.registry.addMenuItem('imageSelector', {
        text: pluginName,
        onAction: function() {
            doAct()
        }
    });

    editor.addCommand('imageSelector', doAct  );

    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "",
            };
        }
    };

});
