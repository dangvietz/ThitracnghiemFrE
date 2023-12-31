import * as yup from "yup";
import * as Message from "../helpers/message"
import { USER_ID_BLANK } from "../helpers/message";
export const subjectSchema = yup
    .object({
        id: yup
            .string()
            .required("Mã môn học không được để trống")
            .max(12, "Mã môn học không được quá 12 ký tự"),
        name: yup
            .string()
            .required("Tên môn học không được để trống.")
            .max(50, "Tên môn học không được quá 50 ký tự."),
        numberOfTheoreticalPeriods: yup
            .number()
            .typeError("Số tiết lý thuyết phải là chữ số")
            .required("Số tiết lý thuyết không được để trống"),
        numberOfPracticePeriods: yup
            .number()
            .typeError("Số tiết thực hành phải là chữ số")
            .required("Số tiết thực hành không được để trống"),
        
    })
    .required();

export const testSchema = yup
    .object({
        // name: yup.string().required("Tên bộ đề không được để trống"),
        testSubjectId: yup.string().required("Môn học không được để trống"),
    })
    .required();

export const questionSchema = yup
    .object({
        content: yup.string().required("Nội dung câu hỏi không được để  trống"),
        chapterId: yup.string().required("Chương không được để trống"),
    })
    .required();

export const userSchema = yup
    .object({
        id: yup.string().required("Mã người dùng").max(10, "Mã người dùng không được quá 10 ký tự"),
        firstName: yup
            .string()
            .required("Tên không được để trống")
            .max(10, "Tên không được quá 100 ký tự"),
        lastName: yup
            .string()
            .required("Họ không được để  trống")
            .max(10, "Họ không được quá 100 ký tự"),
        email: yup
            .string()
            .required("Địa chỉ email không được để  trống")
            .email("Địa chỉ email không đúng định dạng"),
        password: yup.string().min(8, "Mật khẩu ít nhất tám ký tự"),
        birthday: yup.string().required("Ngày sinh không được để  trống"),
        sex: yup.string().required("Giới tính không được để  trống"),
    })
    .required();

    export const userRegisterSchema = yup.object({
        id: yup
          .string()
          .required("Mã người dùng không được để trống")
          .max(10, "Mã người dùng không được quá 10 ký tự")
          .min(4, "Mã người dùng ít nhất 4 ký tự"),
        firstName: yup
          .string()
          .required("Tên không được để trống")
          .max(10, "Tên không được quá 10 ký tự"),
        lastName: yup
          .string()
          .required("Họ không được để trống")
          .max(10, "Họ không được quá 10 ký tự"),
        email: yup
          .string()
          .required("Địa chỉ email không được để trống")
          .email("Địa chỉ email không đúng định dạng"),
        password: yup
          .string()
          .test("password", "Mật khẩu ít nhất 8 ký tự", (value) => {
            if (value && value.length > 0) {
              return value.length >= 8;
            }
            return true; // Passes validation if the password is empty
          })
          .test("password", "Mật khẩu không được quá 32 ký tự", (value) => {
            if (value && value.length > 0) {
              return value.length <= 32;
            }
            return true; // Passes validation if the password is empty
          }),
        birthday: yup.string().required("Ngày sinh không được để trống"),
        sex: yup.string().required("Giới tính không được để trống"),
      }).required();
      
      
/// đăng ký
export const registerPageSchema = yup
    .object({
        id: yup
            .string()
            .required(USER_ID_BLANK)
            .matches(/^[a-zA-Z0-9]*$/, Message.USER_ID_CASE_SENSITIVE)
            .max(10, Message.USER_ID_LENGTH_EXCEED)
            .min(4,Message.USER_ID_MIN_EXCEED),
        firstName: yup
            .string()
            .required(Message.ERROR_NAME_BLANK)
            .max(10, Message.ERROR_NAME_LENGTH_EXCEED),
        lastName: yup
            .string()
            .required(Message.ERROR_FNAME_BLANK)
            .max(10, Message.ERROR_FNAME_LENGTH_EXCEED),
        email: yup
            .string()
            .required(Message.ERROR_EMAIl_BLANK)
            .email(Message.ERROR_EMAIL_TYPE),
        password: yup
            .string()
            .required(Message.ERROR_PASSWORD_BLANK)
            .min(8, Message.ERROR_PASSWORD_MIN)
            .max(32, Message.ERROR_PASSWORD_MAX),
            birthday: yup
  .string()
  .matches(/^\d{2}\/\d{2}\/\d{4}$/, Message.INVALID_DOB)
  .test('is-old-enough', Message.INVALID_DOB_RETYPE, function (value) {
    if (!value) {
      
      return true;
    }
    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - date.getFullYear();
    
    return age >= 18 && age <= 100;
  })
  .required(Message.DOB_BLANK)
,
        sex: yup.string().required(Message.GENDER_BLANK),
        roles: yup
        .string()
        .required(Message.ROLE_BLANK)
 
    })
    .required();


export const creditClassSchema = yup
    .object({
        schoolYear: yup.string().required("Niên khóa không được để trống"),
        semester: yup
            .string()
            .typeError("Học kỳ phải là chữ số")
            .min(1, "Học kỳ ít nhất là HK1")
            .max(4, "Học kỳ nhiều nhất là HK4")
            .required("Học kỳ không được để trống"),
        subjectId: yup.string().required("Môn học không được để trống"),
        teacherId: yup.string().required("Giảng viên không được để trống"),
        group: yup
            .string()
            .typeError("Số SV tối thiểu phải là chữ số")
            .required("Nhóm không được để trống"),
    })
    .required();

export const chapterSchema = yup
    .object({
        subjectId: yup.string().required("Môn học không được để  trống"),
    })
    .required();

export const roleSchema = yup
    .object({
        name: yup.string().required("Tên vai trò được để trống"),
    })
    .required();

export const examSchema = yup
    .object({
        creditClassId: yup.string().required("LTC không được để trống"),
        examDate: yup.string().required("Ngày thi không được để trống"),
    })
    .required();
