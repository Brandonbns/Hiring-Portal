export function storeCollector() {
  console.log("storecollector");
  let Store = JSON.parse(localStorage.getItem("login"));
  console.log(Store, "Store");
  return Store;
}
