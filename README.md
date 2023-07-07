NoemDAK App Documentation
Introduction

The NoemDAK app is a web application that connects drivers, clients, and provides details about their deliveries.
Technology Stack

The NoemDAK app is built using the following technologies:

    Node.js/TypeScript: The server-side runtime environment for the app.
    Express.js: The web framework used for building the API.
    PostgreSQL: The database used for storing data.
    Prisma: The ORM for mapping data into the PostgreSQL database.
    Cloudinary: The service used for storing and managing media files.

POSTMAN Documentation

You can find the API documentation for the NoemDAK app in Postman. Please refer to the following link:

NoemDAK App API Documentation  : https://documenter.getpostman.com/view/28293783/2s93zFYzsA


Example Endpoints
Creating a Schedule

Request:


POST /api/v1/schedules
Content-Type: application/json

{
  "service": "GAS INC",
  "client": "ORITSEGBUBEMI",
  "start_Date": "2023-07-09T00:00:00.000Z",
  "end_Date": "2023-07-09T00:00:00.000Z",
  "pickuploaction": "Heaven",
  "dropofflocation": "MY HOUSE",
  "note": "fkmv,kfmkmkkfbkv",
  "adminId": "fdf46d13-7bf3-467a-be06-094b08105a90",
  "vehicleId": "455ef468-d28b-494a-840f-4b4acaf0b480",
  "driverId": "1c0346bc-e012-4883-a97d-4e4f659278c6",
  "companyId": "3172579a-0cc3-492e-b4c3-b9e4a327273f"
}


Adding a Vehicle

Request

POST /api/v1/vehicles
Content-Type: multipart/form-data

vehicle_name="Toyota"
vehicle_type="GL"
status="Repair"
file=@"/home/oritse/Downloads/FB_IMG_16449390952670126.jpg"





Conclusion

By following this documentation, you should be able to use the NoemDAK app to get information about drivers, clients, companies, vehicles, and their statuses. You can also create schedules as an admin and filter schedules by drivers, vehicles, day, week, or month.

Please note that there is currently no authentication and authorization implemented, so the endpoints can be accessed freely. If you have any questions or feedback, please don't hesitate to contact us.
