import { GenIcon } from "react-icons/lib";
export function SecondYellowCard(props) {

    return GenIcon({
      "tag": "svg",
      "attr": {
        "viewBox": "0 0 24 48", // Doubling the viewBox height
        "strokeWidth": "2",
        "stroke": "currentColor",
        "fill": "none",
        "strokeLinecap": "round",
        "strokeLinejoin": "round"
      },
      "child": [
        {
          "tag": "path",
          "attr": {
            "stroke": "none",
            "d": "M0 0h24v48H0z", // Doubling the viewBox height
            "fill": "none"
          }
        },
        {
          "tag": "path",
          "attr": {
            "d": "M14 4h-10a6 6 0 0 0 -6 6v20a6 6 0 0 0 6 6h10a6 6 0 0 0 6 -6v-20a6 6 0 0 0 -6 -6z",
            "strokeWidth": "0",
            "fill": "#FFc100" // Equivalent to "text-yellow-400"
          }
        },
        {
          "tag": "path",
          "attr": {
            "d": "M26 2h-10a6 6 0 0 0 -6 6v20a6 6 0 0 0 6 6h10a6 6 0 0 0 6 -6v-20a6 6 0 0 0 -6 -6z",
            "strokeWidth": "0",
            "fill": "red" // Color for the front card
          }
        },
      ]
    })(props);
  };
