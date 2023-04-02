import React, { ChangeEvent } from "react";
import { TInputFormState } from "../../types/typings";
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
  isTextarea?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputData: TInputFormState;
}

const InputField = (props: Props) => {
  ///vars
  const {
    id,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    inputData,
    isTextarea,
  } = props;
  const { isValid, isDirty, errorMessage } = inputData;

  ////jsx
  return (
    <div className="flex flex-col items-start justify-start w-full pr-16 mb-[8px]">
      <div
        className={clsx("font-semibold font-style-formLabels mb-[3px]", {
          "text-error": !isValid && isDirty,
        })}
      >
        {name}
      </div>
      <div
        className={clsx(
          "relative w-full",
          { "h-[62px]": !isTextarea },
          { "h-[198px]": isTextarea }
        )}
      >
        {!isTextarea ? (
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={clsx(
              "w-full h-[44px] pl-4 border border-transparent outline-none border-b-main_color shadow-input-shadow font-style-formText",
              { "bg-background_1_lighter": !isDirty || (!isValid && !isDirty) },
              { "bg-background_2_darker": isValid && isDirty },
              {
                "bg-error text-white placeholder:text-background_2_darker":
                  !isValid && isDirty,
              }
            )}
            // className={`group-focus:border-b-2 transition-all ease-out duration-200 min-w-full ml-2 p-2 bg-main-bg dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] ${
            //   isErrorPresent && isTouched
            //     ? "bg-red-100 text-black dark:bg-red-700 dark:text-white"
            //     : ""
            // }`}
            // style={{ borderColor: isFocused ? currentColor : "" }}
          />
        ) : null}

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={clsx(
              "w-full h-[198px] pl-4 border border-transparent outline-none border-b-main_color shadow-input-shadow font-style-formText",
              { "bg-background_1_lighter": !isDirty || (!isValid && !isDirty) },
              { "bg-background_2_darker": isValid && isDirty },
              {
                "bg-error text-white placeholder:text-background_2_darker":
                  !isValid && isDirty,
              }
            )}
          ></textarea>
        ) : null}

        {!isValid && isDirty ? (
          <div className="absolute -bottom-[1px] left-0 font-style-xs text-error">
            {errorMessage}
          </div>
        ) : null}
      </div>
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
