export class DateUtils {

    public static get futureDate():Date {
        let departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 10);
        return departureDate
    }

    public static get currentDate():string{   
        return new Date().toISOString().replace('T', ' ').substring(0, 19);
    }

    public static getDatesForValidation(dateOfSelection: Date): { datePanelTobeSelected: string; dateToAssert: string; dateToBeSet: string; } {
        const dateToBeSet = dateOfSelection.getDate().toString();
        const expectedMonthLong = dateOfSelection.toLocaleString('En-US', { month: 'long' });
        const expectedMonthShort = dateOfSelection.toLocaleString('En-US', { month: 'short' });
        const expectedDayInWeek = dateOfSelection.toLocaleString('En-US', { weekday: 'short' });
        const expectedYear = dateOfSelection.getFullYear();
        const datePanelTobeSelected = `${expectedMonthLong} ${expectedYear}`;
        const dateToAssert = `${expectedDayInWeek}, ${expectedMonthShort} ${dateToBeSet}`;
        return { datePanelTobeSelected, dateToAssert, dateToBeSet };
    }

}