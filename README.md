# alexrybicki.gethub.io


# Time Picker
Modified fork of [https://github.com/weareoutman/clockpicker](https://github.com/weareoutman/clockpicker)

Use the sources [here](https://src.rybicki.dev/docs/index.html).
## Usage
requires jquery.
```html
<head>
<link rel="stylesheet" type="text/css" href="https://src.rybicki.dev/docs/src/index.html">
<script defer src="https://src.rybicki.dev/docs/src/js/clockpicker.min.js"></script>
<script type="text/javascript">
```
```javacript
    $(document).ready(function(){
        var input = $('#time');
        input.clockpicker({
            twelvehour: true, #12 hour time
            donetext: 'Done', 
            vibrate:true,
            change: myFunct #runs myFunct(); When the user is done inputting.
        });
    });
```
```html
    </script>
</head>
<body>
 <input id="time">
</body>
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)
