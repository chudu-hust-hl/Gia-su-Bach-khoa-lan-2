import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import { Category } from "types/category";
import { Product, Variant } from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { UserCurrentType } from "types/user";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import categories from "../mock/categories.json";
import mockClasses from "../mock/classes.json";
import { GSClass, GSLesson, GSStudentInfo } from "types";

export const userState = selector({
  key: "user",
  get: async () => {
    try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });
      return userInfo;
    } catch (error) {
      return {
        id: "",
        avatar: "",
        name: "Người dùng Zalo",
      };
    }
  },
});

export const userCurrentState = atom<UserCurrentType>({
  key: 'userCurrentState',
  default: (() => {
    const storedUser = localStorage.getItem('userType');
    return storedUser ? JSON.parse(storedUser) as UserCurrentType : { userCurrentType: null }; // Default value
  })(),
});


export const bannersState = selector({
  key: "bannersState",
  get: async () =>{
    await wait(2000);
    const lessons = (await import("../mock/banners.json")).default;
    return lessons;
  },
});

export const tabsState = atom({
  key: "tabsState",
  default: ["Lớp đang diễn ra", "Lớp đang yêu cầu", "Lớp đã kết thúc"],
});

export const selectedTabIndexState = atom({
  key: "selectedTabIndexState",
  default: 0,
});



// Define classesState using atom
{/*export const classesState = selector<GSClass[]>({
  key: "classesState",
  get: async () =>{
    await wait(2000);
    const classes = (await import("../mock/classes.json")).default;
    return classes;
  },
});*/}

export const classesState = selector<GSClass[]>({
  key: "classesState",
  get: () => mockClasses,
})

export const lessonsState = selector<GSLesson[]>({
  key: "lessonsState",
  get: async () =>{
    await wait(2000);
    const lessons = (await import("../mock/lessons.json")).default;
    return lessons;
  },
});

export const tutorsState = selector<GSStudentInfo[]>({
  key: "tutorsState",
  get: async () =>{
    await wait(2000);
    const lessons = (await import("../mock/tutors.json")).default;
    return lessons;
  },
});



export const districtsState = atom({
  key: "districtsState",
  default: [
    "Quận Hai Bà Trưng",
    "Quận Hoàng Mai",
    "Quận Đống Đa",
    "Quận Hoàn Kiếm",
    "Quận Thanh Xuân",
    "Quận Ba Đình",
    "Quận Hà Đông",
    "Quận Cầu Giấy",
    "Quận Long Biên",
    "Quận Bắc Từ Liêm",
    "Quận Nam Từ Liêm",
    "Quận Tây Hồ",
    "Khác",
  ], // Default value (list of districts)
});

export const subjectsState = atom({
  key: "subjectsState",
  default: [
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Tin học",
    "Sinh học",
    "Ngoại ngữ",
    "Ngữ Văn",
    "Đánh gia tư duy Bách khoa",
    "Kĩ năng mềm",
    "STEM",
    "Tin học văn phòng",
    "Các môn tiểu học",
    ],
})

export const selectedSubjectsState = atom<number[]>({
  key: "selectedSubjectsState",
  default: [],
});

export const selectedDistrictsState = atom<string[]>({
  key: "selectedDistrictsState", 
  default: [], 
});

export const levelsState = atom<string[]>({
  key: "levelsState",  
  default: ["Tiểu học", "THCS", "THPT", "Đại học"], // Default list of levels
});

export const selectedLevelsState = atom<string[]>({
  key: "selectedLevelsState",  
  default: [], // Default value
});

export const selectedFormTeachState = atom<string[]>({
  key: "selectedFormTeachState",  
  default: [], // Default value
});

export const classState = selectorFamily<GSClass | undefined, string>({
  key: "classState",
  get: (id) => ({ get }) => {
    const classes = get(classesState); // Get the classes state
    return classes.find((classItem) => classItem.id === id); // Find the class by ID
  },
});

export const lessonState = selectorFamily({
  key: "lessonState",
  get: (id: string) => ({ get }) => {
    const lessons = get(lessonsState); // Access the lessons atom
    return lessons.find((lessonItem) => lessonItem.LessonID === id) || null; // Return the matching lesson or null
  },
});

export const tutorState = selectorFamily({
  key: "tutorState",
  get: (id: string) => ({ get }) => {
    const tutors = get(tutorsState); // Access the tutors atom
    return tutors.find((tutor) => tutor.StudentID === id) || null; // Return the matching tutor or null
  },
});













































export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const products = (await import("../mock/products.json")).default;
    const variants = (await import("../mock/variants.json"))
      .default as Variant[];
    return products.map(
      (product) =>
        ({
          ...product,
          variants: variants.filter((variant) =>
            product.variantId.includes(variant.id)
          ),
        } as Product)
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "VNG Campus Store",
      address:
        "Khu chế xuất Tân Thuận, Z06, Số 13, Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.741639,
      long: 106.714632,
    },
    {
      id: 2,
      name: "The Independence Palace",
      address:
        "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779159,
      long: 106.695271,
    },
    {
      id: 3,
      name: "Saigon Notre-Dame Cathedral Basilica",
      address:
        "1 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779738,
      long: 106.699092,
    },
    {
      id: 4,
      name: "Bình Quới Tourist Village",
      address:
        "1147 Bình Quới, phường 28, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.831098,
      long: 106.733128,
    },
    {
      id: 5,
      name: "Củ Chi Tunnels",
      address: "Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 11.051655,
      long: 106.494249,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      try {
        const { number, token } = await getPhoneNumber({ fail: console.warn });
        if (number) {
          return number;
        }
        console.warn(
          "Sử dụng token này để truy xuất số điện thoại của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập số điện thoại mặc định: 0337076898");
        return "0337076898";
      } catch (error) {
        // Xử lý exception
        console.error(error);
        return false;
      }
    }

    return false;
  },
});

export const orderNoteState = atom({
  key: "orderNote",
  default: "",
});
