import { ListTable } from "@/components/praticienComponents/list-table";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const AccueilPraticien = () => {
  const [appointments, setAppointments] = useState([]);
  const [pratiques, setPratiques] = useState([]);
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
        try {
            setAppointments(JSON.parse(storedAppointments));
        } catch (err) {
            console.error("Erreur lors du parsing des appointments", err);
        }
    }
    const storedPratiques = localStorage.getItem("pratiques");
    if(storedPratiques) {
        try {
            setPratiques(JSON.parse(storedPratiques));
        } catch (err) {
            console.error("Erreur lors du parsing des pratiques", err);
        }
    
    }
    
  }, []);

  const todayStr = format(new Date(), 'dd-MM-yyyy');
  const todayAppointments = appointments.filter(app => app.date === todayStr);
  
  function getAppointmentsForNextWeekDays(appointments) {
    // Date d'aujourd'hui en commençant par minuit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Date limite : 7 jours à partir d'aujourd'hui
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    
    return appointments.filter(appointment => {
      // Parsing de la date au format "DD-MM-YYYY"
      const [day, month, year] = appointment.date.split('-').map(Number);
      // Créer l'objet Date (le mois commence à 0)
      const appointmentDate = new Date(year, month - 1, day);
      
      // Vérifier si la date du rendez-vous est comprise entre aujourd'hui et dans 7 jours
      return appointmentDate >= today && appointmentDate <= sevenDaysLater;
    });
  }

  const nextWeekDaysAppointments = getAppointmentsForNextWeekDays(appointments);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 m-4 p-4 bg-muted/50 rounded-xl">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {/* First Card */}
          <div className="flex items-start justify-between p-5 bg-helloSoin rounded-xl shadow-sm">
            <div className="flex flex-col justify-between h-full">
              <div className="text-sm text-gray-100">
                Rendez-vous <br />
                du jour
              </div>
              <div className="flex items-center pt-1">
                <div className="text-xl font-medium text-gray-100">{todayAppointments.length}</div>
              </div>
            </div>
            <div className="text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 51 51"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M48.875 12.75L28.687 32.938 18.063 22.312 2.126 38.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M36.125 12.75h12.75V25.5"
                ></path>
              </svg>
            </div>
          </div>
          {/* Second card */}
          <div className="flex gap-2 items-start justify-between p-5 bg-helloOrange rounded-xl shadow-sm">
            <div className="flex flex-col justify-between h-full">
              <div className="text-sm text-white">
                Rendez-vous <br /> 7 prochaines jours
              </div>
              <div className="flex items-center pt-1">
                <div className="text-xl font-medium text-white ">{nextWeekDaysAppointments.length}</div>
              </div>
            </div>
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 47 46"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M41.536 30.456a19.21 19.21 0 01-5.675 7.4 19.771 19.771 0 01-8.557 3.937c-3.138.608-6.38.455-9.444-.447a19.673 19.673 0 01-8.129-4.725 19.1 19.1 0 01-4.92-7.902 18.775 18.775 0 01-.564-9.237 18.98 18.98 0 013.923-8.419 19.538 19.538 0 017.497-5.639"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M43.083 23c0-2.517-.506-5.01-1.49-7.335a19.142 19.142 0 00-4.246-6.218 19.617 19.617 0 00-6.353-4.155A19.953 19.953 0 0023.5 3.833V23h19.583z"
                ></path>
              </svg>
            </div>
          </div>
          {/* third cart */}
          <div className="flex items-start justify-between p-5 bg-helloPurple rounded-xl shadow-sm">
            <div className="flex flex-col justify-between h-full">
              <div className="text-sm text-white ">
                Nombres de <br />
                Pratiques
              </div>
              <div className="flex items-center pt-1">
                <div className="text-xl font-medium text-white">{pratiques.length}</div>
              </div>
            </div>
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 47 46"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M39.167 40.25v-3.833a7.585 7.585 0 00-2.295-5.422 7.92 7.92 0 00-5.539-2.245H15.667a7.92 7.92 0 00-5.54 2.245 7.585 7.585 0 00-2.294 5.422v3.833M23.5 21.083c4.326 0 7.833-3.432 7.833-7.666 0-4.235-3.507-7.667-7.833-7.667-4.326 0-7.833 3.432-7.833 7.667 0 4.234 3.507 7.666 7.833 7.666z"
                ></path>
              </svg>
            </div>
          </div>
          {/* fourth cart */}
          {/* <div className="flex items-start justify-between p-5 bg-helloBlue rounded-xl shadow-sm">
            <div className="flex flex-col justify-between h-full">
              <div className="text-sm text-white ">
                Revenu <br />
                du jour (en $)
              </div>
              <div className="flex items-center pt-1">
                <div className="text-xl font-medium text-white ">600</div>
              </div>
            </div>
            <div className="text-white">
              <svg
                className="w-8 h-8"
                viewBox="0 0 47 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5 38.3334V19.1667"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M35.25 38.3334V7.66675"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11.75 38.3334V30.6667"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div> */}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <ListTable todayAppointments={todayAppointments}/>
        </div>
      </div>
    </>
  );
};

export default AccueilPraticien;
