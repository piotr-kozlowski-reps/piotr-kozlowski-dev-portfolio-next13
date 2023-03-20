import React from "react";

interface Props {
  id: string;
  name: string;
  placeholder: string;
}

const InputField = (props: Props) => {
  ///vars
  const { id, name, placeholder } = props;

  ////jsx
  return (
    <div className="flex flex-col items-start justify-start w-full pr-16 mb-8">
      <div className="font-semibold font-style-formLabels">{name}</div>
      <input
        id={id}
        name="name"
        placeholder={placeholder}
        className="w-full h-[44px] pl-4 bg-background_1_lighter border border-background_1_lighter border-b-main_color outline-none shadow-input-shadow font-style-formText"
        // value={value}
        // onChange={(val) => onChange(val)}
        // className={`group-focus:border-b-2 transition-all ease-out duration-200 min-w-full ml-2 p-2 bg-main-bg dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] ${
        //   isErrorPresent && isTouched
        //     ? "bg-red-100 text-black dark:bg-red-700 dark:text-white"
        //     : ""
        // }`}
        // style={{ borderColor: isFocused ? currentColor : "" }}
        // onFocus={focusInHandler}
        // onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;

// import React, { ComponentType, Fragment, useState } from "react";
// import { Field, ErrorMessage } from "formik";
// import TextErrorFormik from "./TextErrorFormik";
// import { useThemeProvider } from "../../contexts/theme-context";
// // import { useStateContext } from "../../context/ContextProvider";

// ////func
// // const getNestedObject: any = (obj: any, path: string | string[]) => {
// //   if (typeof obj === "undefined" || obj === null) return null;
// //   if (typeof path === "string") path = path.split(".");

// //   if (path.length === 0) return obj;
// //   return getNestedObject(obj[path[0]], path.slice(1));
// // };

// const InputFormik = (props: any) => {
//   ////vars
//   const {
//     label,
//     name,
//     errors,
//     placeholder,
//     touched,
//     additionalClass,
//     ...rest
//   } = props;
//   const { currentColor } = useThemeProvider();

//   const [isFocused, setIsFocused] = useState(false);

//   ////jsx
//   return (
//     <Fragment>
//       <div
//         className={`w-full mt-3 pr-6 flex items-center ${
//           additionalClass ? additionalClass : ""
//         }`}
//       >
//         <label htmlFor={name} className={` text-lg `}>
//           {label}
//         </label>
//         <Field id={name} name={name} {...rest}>
//           {(formik: any) => {
//             ////focus/blur adding classes logic
//             const focusInHandler = () => {
//               setIsFocused(true);
//             };
//             const blurHandler = () => {
//               setIsFocused(false);
//             };

//             if (typeof window !== "undefined") {
//               const inputEl = document?.getElementById(name);

//               if (inputEl) {
//                 inputEl.onblur = blurHandler;
//               }
//             }

//             ////vars
//             const { field, form } = formik;
//             const { value, onChange, onBlur } = field;
//             const { errors, touched } = form;

//             // const isErrorPresent = getNestedObject(errors, name);
//             // const isTouched = getNestedObject(touched, name);
//             const isErrorPresent: undefined | string = errors[name];
//             const isTouched: undefined | boolean = touched[name];

//             ////jsx
//             return (
//               <input
//                 id={name}
//                 name={name}
//                 placeholder={placeholder}
//                 value={value}
//                 {...rest}
//                 onChange={(val) => onChange(val)}
//                 className={`group-focus:border-b-2 transition-all ease-out duration-200 min-w-full ml-2 p-2 bg-main-bg dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] ${
//                   isErrorPresent && isTouched
//                     ? "bg-red-100 text-black dark:bg-red-700 dark:text-white"
//                     : ""
//                 }`}
//                 style={{ borderColor: isFocused ? currentColor : "" }}
//                 onFocus={focusInHandler}
//                 onBlur={onBlur}
//               />
//             );
//           }}
//         </Field>
//       </div>
//       <div className="text-xs font-semibold text-red-600">
//         <ErrorMessage
//           name={name}
//           component={TextErrorFormik as string | ComponentType<{}> | undefined}
//         />
//       </div>
//     </Fragment>
//   );
// };

// export default InputFormik;
