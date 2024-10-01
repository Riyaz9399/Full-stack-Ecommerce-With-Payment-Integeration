const backendDomain = "http://localhost:8080";
export const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  Current_User: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-Product`,
    method: "post",
  },
  getProduct: {
    url: `${backendDomain}/api/get-Product`,
    method: "get",
  },
  EditUpdateProduct: {
    url: `${backendDomain}/api/edit-product`,
    method: "post",
  },
  getProductWisecategories: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categorieWiseProduct: {
    url: `${backendDomain}/api/categories_product`,
    method: "post",
  },
  ProductsDetails: {
    url: `${backendDomain}/api/product-Details`,
    method: "post",
  },
  AddproductIntoCart:{
    url: `${backendDomain}/api/Add-Cart`,
    method: "post",
  },
  countAddtoCartProduct:{
    url: `${backendDomain}/api/countAddtoCartProduct`,
    method: "get",
  },
  ViewCartProduct:{
    url: `${backendDomain}/api/CartProduct-View`,
    method: "get",
  },
  UpdateCartProduct:{
    url: `${backendDomain}/api/update-cart`,
    method: "post",
  },
  DeleteCartProduct :{
    url: `${backendDomain}/api/delete-product`,
    method: "post",
  },
  SearchProduct :{
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  FilterProduct:{
     url: `${backendDomain}/api/filter-Product`,
     method: "post",
  },
  payment:{
     url: `${backendDomain}/api/payment`,
     method: "post",
  },paymentverification:{
    url: `${backendDomain}/api/paymentverification`,
    method:"post"
  },getOrders:{
    url: `${backendDomain}/api/get-Orders`,
     method:"get"
  }

  
};
