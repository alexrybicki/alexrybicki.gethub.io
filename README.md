# alexrybicki.gethub.io


# Time Picker 2
Modified fork of [https://github.com/weareoutman/clockpicker](https://github.com/weareoutman/clockpicker)

Use the sources [here](https://src.rybicki.dev/docs/src/index.html).

## Usage
Requires jquery.
Demo [here](https://src.rybicki.dev/docs/src/picker_example.html).
<p align="center">
  <img src="/docs/TimePicker2_Usage_Example.png"></p>
  
Demo of [multiple instances](https://src.rybicki.dev/docs/src/picker_example_difference.html).

```html
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="https://src.rybicki.dev/docs/src/css/clockpicker2.min.css">
    <script defer src="https://src.rybicki.dev/docs/src/js/clockpicker2.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript">
```
```javascript
        function myFunct() {
            var inputTime = document.getElementById('timeInput').value;
            document.getElementById('timeLabel').textContent = "You entered " + inputTime + "."
        }
        $(document).ready(function () {
            var input = $('#timeInput');
            input.clockpicker({
                twelvehour: true, //12 hour time
                donetext: 'Done',
                vibrate: true,
            });
        });
```
```html        
    </script>
</head>

<body>
    <p>
        <input id="timeInput" value="Click Here" onChange="myFunct()">
        <label id="timeLabel" for="timeInput"></label>
    </p>
</body>
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)
