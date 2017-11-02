import {msg} from "./contents";
import "./message.scss";

const div = document.createElement("div");
div.id = "message";
const txtNode = document.createTextNode(msg);
div.appendChild(txtNode);
document.body.appendChild(div);
