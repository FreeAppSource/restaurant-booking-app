# Restaurant Booking App (Foodmedia)

> 👨‍💻 Developed by **[Suresh Kumar Meesala](https://github.com/SureshKumarMeesala)** · 🎨 UI design by **Sadek Hossen Rony** (credits below)

A restaurant table reservation & dining app based on the **Restaurant Booking App** Sketch UI Kit (`Food App` page, 26 artboards). Built with **React Native 0.88+**, **Expo SDK 58+**, and **Expo Router** using **pure JavaScript and JSX (`.js`, `.jsx`)**.

---

## 🎨 Artboards & Features (based on 26 design artboards)

| # | Artboard Name | Sketch ID | Screen Location | Description |
|---|---|---|---|---|
| 1 | **First (Onboarding 1)** | `349BE5C7-FCE6-46FF-9242-BB6D77578DC2` | `src/app/index.jsx` | *"Nearby restaurants"* onboarding with burger illustration & skip button. |
| 2 | **2nd (Onboarding 2)** | `07FD9E93-3F05-49C4-9111-96CE036B195B` | `src/app/index.jsx` | *"Select the Favorites Menu"* onboarding with pizza artwork. |
| 3 | **3rd (Onboarding 3)** | `3234E576-2707-4210-8F7A-37AEC76BF0AF` | `src/app/index.jsx` | *"Good food at a cheap price"* onboarding with biryani visual. |
| 4 | **First (Auth Choice)** | `E6B1FBCF-484A-43DE-9685-1D6336E37E57` | `src/app/index.jsx` | Welcome landing with Create Account & Login buttons + terms agreement. |
| 5 | **Registration First** | `470CE5C0-14D3-4DCA-9324-EB46771E51D6` | `src/app/auth.jsx` | Tabbed Registration form (Full Name, Email, Password, Google OAuth). |
| 6 | **Registration Page** | `90CE334E-3184-48A1-B7B2-3AF9D825C9BE` | `src/app/auth.jsx` | Active populated registration state (*Sadek Hossen Rony*). |
| 7 | **Login** | `533C42E1-9013-42FA-80CB-8C1915DBE579` | `src/app/auth.jsx` | Tabbed Login form (Email address, Password, Google Sign In, Forgot Password). |
| 8 | **Login (Filled)** | `8CC6420D-2E84-44F0-B237-80ED2B90918D` | `src/app/auth.jsx` | Populated login state (*sadekbranding@gmail.com*). |
| 9 | **Enter Email** | `9CCD50EB-7C50-4ACA-9DE5-548B3CC0F712` | `src/app/forgot-password.jsx` | Forgot password email prompt. |
| 10 | **Back Email** | `08FA4567-8754-4F3D-BEBC-2D6233455680` | `src/app/forgot-password.jsx` | *"Please check your email"* inbox confirmation step. |
| 11 | **Enter Password** | `DCE4A817-C5BE-48E4-A73C-B5628EF8590F` | `src/app/forgot-password.jsx` | Reset password screen with new password & confirm inputs. |
| 12 | **Success** | `9730E7F1-F713-4C09-9526-C4881FB92964` | `src/app/forgot-password.jsx` | Password changed congratulations modal & Sign In CTA. |
| 13 | **Home** | `D7119248-F90D-499A-9827-29BE068DBF8E` | `src/app/(tabs)/index.jsx` | Location header (*Agrabad 435, Chittagong*), search bar, Flash Offer & New Arrival promo cards. |
| 14 | **Scroll** | `A4AF9F7F-7B2A-4DE5-ACCC-9C9D78CC0D49` | `src/app/(tabs)/index.jsx` | *"Today New Arivable"* dishes carousel (*Chicken Biryani, Sauce Tonkatsu, Chicken Katsu, Dumpling*) & Nearby Restaurants. |
| 15 | **Map** | `760B9D9D-F868-4E6C-AAD7-3AACDB83078F` | `src/app/(tabs)/map.jsx` | Chittagong street map with pins for Ambrosia, Tava, Haatkhola & floating restaurant card preview. |
| 16 | **Booking History** | `60798E6F-5EA0-4571-9893-A21809162A6D` | `src/app/(tabs)/history.jsx` | Active & completed bookings list, reservation cards, and *"Booking more"* action. |
| 17 | **Account / Profile** | `FA06103C-34F4-4FCC-AFF9-3AD4CDBE7550` | `src/app/(tabs)/profile.jsx` | User card (*Sadek Hossen*), 3 active reservations badge, Account Settings, Language, Feedback, Rate Us, Logout. |
| 18 | **Details** | `B6C486EF-8DD3-4307-9097-D9630C4F1821` | `src/app/details.jsx` | Restaurant hero view (*Ambrosia Hotel & Restaurant*), open hours, menu highlights, and Book Table bar. |
| + | **Booking Modal** | *Component* | `src/components/BookingModal.jsx` | Date picker, time slot, guest counter (1-12), and seating area selection (*VIP Terrace, Indoor, Garden*). |
| + | **Confirmation** | *Modal* | `src/app/booking-confirmation.jsx` | Confirmation ticket with unique code `BK-78921` and booking breakdown. |

---

## 💎 Design Tokens

- **Brand Green**: `#32B768` / `#EAF7EE` / `#269151`
- **Accent Orange**: `#FF7B2C`
- **Dark Text**: `#1F2937` / `#111827`
- **Sub Text**: `#6B7280`
- **Surface**: `#FFFFFF` / `#F9FAFB`

---

## 🚀 Running the App

```bash
# Start development server
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

<!-- developer:start -->

## 👨‍💻 Developer

This React Native app was developed by **Suresh Kumar Meesala**.

| | |
|---|---|
| Developer | [Suresh Kumar Meesala](https://github.com/SureshKumarMeesala) |
| GitHub | [@SureshKumarMeesala](https://github.com/SureshKumarMeesala) |
| Organization | [FreeAppSource](https://github.com/FreeAppSource) |
| Repository | <https://github.com/FreeAppSource/restaurant-booking-app> |

<!-- developer:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Multipurpose Booking App UI Kit** design by **Sadek Hossen Rony**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Sadek Hossen Rony](https://www.sketchappsources.com/contributor/sadekbranding) |
| Original design | [Multipurpose Booking App UI Kit](https://www.behance.net/gallery/122792839/Hotel-booking-and-Restaurant-Booking-App-Uikit) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4737-multipurpose-booking-ui-kit-sketch-freebie-resouce.html) |
| Twitter | <https://twitter.com/sadekrony435> |
| Website | <https://sadekbraning.myportfolio.com/> |
| Original file | `restaurant-booking-ui-kit-sadek.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Multipurpose Booking App UI Kit" by Sadek Hossen Rony (https://www.behance.net/gallery/122792839/Hotel-booking-and-Restaurant-Booking-App-Uikit), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4737-multipurpose-booking-ui-kit-sketch-freebie-resouce.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
