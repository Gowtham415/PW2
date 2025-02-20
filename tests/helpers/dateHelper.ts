export class DateUtils {

    static get futureDate() {
        let departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 10);
        return departureDate
    }

}