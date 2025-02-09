import axios from "axios"

class HolidaysService {
  getAllHolidays = async () => {
    const response = await axios.get("https://date.nager.at/api/v3/NextPublicHolidays/US")
    return response
  }
}

export const holidaysService = new HolidaysService()
