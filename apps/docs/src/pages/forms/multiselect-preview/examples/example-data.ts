import { ref } from "vue";

const items = [
  { id: 1, label: "Andrew Powell (Senior)", labelShort: "Andrew Powell" }, 
  { id: 2, label: "Tom Smith (Senior)", labelShort: "Tom Smith" }, 
  { id: 3, label: "Richard Wilson (Dev)", labelShort: "Richard Wilson" }, 
  { id: 4, label: "Josh Sexton-Jones (Junior Dev)", labelShort: "Josh Sexton-Jones" }, 
  { id: 5, label: "Adam Thompson (Dev)", labelShort: "Adam Thompson" }, 
  { id: 6, label: "Tom McGurrin (Senior)", labelShort: "Tom McGurrin" }, 
  { id: 7, label: "Hamza Mahmood (Dev)", labelShort: "Hamza Mahmood" }, 
  { id: 8, label: "Isabel Mallon (Junior Dev)", labelShort: "Isabel Mallon" }
];

export { items };

const selectedItems = ref([
  { id: 1, label: "Andrew Powell (Senior)", labelShort: "Andrew Powell" }, 
  { id: 2, label: "Tom Smith (Senior)", labelShort: "Tom Smith" }, 
  { id: 7, label: "Hamza Mahmood (Dev)", labelShort: "Hamza Mahmood" }, 
  { id: 8, label: "Isabel Mallon (Junior Dev)", labelShort: "Isabel Mallon" }
]);

export { selectedItems };

