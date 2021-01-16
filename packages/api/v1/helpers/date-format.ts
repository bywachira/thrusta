import moment from "moment";
import timezone from "moment-timezone";

export const getRanges = (period: string): string[] => {
    let currentDate = new Date()

    switch (period) {
        case "past-month":
            const pastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
            return [pastMonth, currentDate.toISOString()]
        case "6-months":
            const lastSixthMonth = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString()
            return [lastSixthMonth, currentDate.toISOString()]
        case "past-year":
            const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
            return [lastYear, currentDate.toISOString()]
        case "last-7-days":
            const lastSevenDays = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
            return [lastSevenDays, currentDate.toISOString()]
        case "last-24hrs":
            const yesterday = new Date(new Date().setHours(new Date().getHours() - 24)).toISOString()
            return [yesterday, currentDate.toISOString()]
        default:
            return [currentDate.toISOString(), currentDate.toISOString()];
    }
}

export const formatDate = (period: string, user_timezone: string, date: string): string | number => {
    let tz = timezone.tz(date, user_timezone);
    let formatDate: string | number = ""
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    switch (period) {
        case "past-month":
            formatDate = moment(new Date(date)).format("ll")
            break;
        case "6-months":
            formatDate = months[new Date().getMonth()]
            break;
        case "past-year":
            formatDate = moment(date).format("YYYY")
            break;
        case "last-7-days":
            formatDate = moment(date).format("dddd")
            break
        case "last-24hrs":
            formatDate = moment(tz).format("HH:MM")
            break
        default:
            break;
    }

    return formatDate
}