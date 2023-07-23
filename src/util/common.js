import moment from "moment";

export const convertDateFormat = (date, date_format) => {
    date_format = date_format || "YYYY-MM-DD";
    try{
      date = moment(date).format(date_format);
    }catch(err){
      console.log("MOMENT ERROR:", err);
    }
    return date;
}