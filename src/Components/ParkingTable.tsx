import React, { useState, useEffect } from "react";

interface ParkingTableProps {
  data: { [key: string]: string };
}

const ParkingTable = ({ data }: ParkingTableProps) => {
  const formatTime = (timeString: string) => {
    const [hours24, minutes] = timeString.split(":").map(Number);
    const ampm = hours24 >= 12 ? "PM" : "AM";
    const hours = hours24 % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  // const [parkingHistory, setParkingHistory] = useState([]);
  // let count = 1;

  // useEffect(() => {
  //   Object.entries(data).forEach(([key, value]) => {
  //     const carIdentifier = `Car ${key.slice(1)}`;
  //     const carName = `Car ${count}`;
  //     const exitKey = `x${key.slice(1)}`;
  //     const exitValue = data[exitKey];
  //     if (key.startsWith('e') && value !== "Empty Slot") {
  //       const entryKey = `e${key.slice(1)}`;
  //       const entryValue =  data[entryKey];
  //       console.log(exitValue);

  //         // Parse dates
  //         // const entryTime = new Date(convertDateFormat(value));
  //         // const exitTime = new Date(convertDateFormat(exitValue));

  //         // // Check if dates are valid
  //         // if (isNaN(entryTime.getTime()) || isNaN(exitTime.getTime())) {
  //         //   console.error(`Invalid date format for ${carIdentifier}`);
  //         //   return;
  //         // }

  //         // const durationInSeconds = (exitTime.getTime() - entryTime.getTime()) / 1000;
  //         // const cost = durationInSeconds * 0.01; // 1 cent for 0.01 second

  //         // Check if car's parking information is already in parkingHistory
  //         if (!parkingHistory.some((car => car.carIdentifier === carIdentifier)) || (parkingHistory.some(car => car.carIdentifier === carIdentifier) && exitValue !== " " && entryValue === "Empty Slot")) {
  //           console.log(parkingHistory.some(car => car.carIdentifier === carIdentifier));
  //           count += 1;

  //           setParkingHistory(prevHistory => [
  //             ...prevHistory,
  //             {
  //               carIdentifier,
  //               carName,
  //               entryTime: formatTime(entryValue),
  //               exitTime: " ",
  //               // duration: durationInSeconds.toFixed(2),
  //               // cost: cost.toFixed(2),
  //             },
  //           ]);
  //         }
  //         else if(exitValue !== " " && parkingHistory.some(car => car.carIdentifier === carIdentifier)){
  //           console.log("update history");
  //           setParkingHistory((prevHistory) =>
  //             prevHistory.map((car) =>
  //               car.carIdentifier === carIdentifier && car.entryTime === formatTime(entryValue)
  //                 ? { ...car, exitTime: formatTime(exitValue) , carIdentifier:" "}
  //                 : car
  //             )
  //           );
  //         }
  //         console.log(parkingHistory.filter(obj => { return obj.carIdentifier === carIdentifier}));
  //       }
  //     });
  //   }, [data, parkingHistory]);

  const [parkingInfo, setParkingInfo] = useState([]);

 useEffect(() => {
  // Create a new array for the parking information
  const newParkingInfo = [...parkingInfo];

  // Iterate over the data
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith("e")) {
      const carIdentifier = `Car ${key.slice(1)}`;
      const exitKey = `x${key.slice(1)}`;
      const exitValue = data[exitKey];

      // Find the index of the car in the parkingInfo array
      const index = newParkingInfo.findIndex(car => car.carIdentifier === carIdentifier);

      if (value !== "Empty Slot") {
        // Parse the entry time
        const entryTime = new Date(value);

        // If the car has left the slot, calculate the duration and cost
        let exitTime = " ";
        let duration = " ";
        let cost = " ";
        if (exitValue !== " ") {
          exitTime = formatTime(exitValue);
          duration = ((new Date(exitValue).getTime() - entryTime.getTime()) / 1000).toFixed(2);
          cost = ((new Date(exitValue).getTime() - entryTime.getTime()) / 1000 * 0.01).toFixed(2);
        }

        // If the car is already in the parkingInfo array, update its information
        if (index !== -1) {
          newParkingInfo[index] = {
            carIdentifier,
            entryTime: formatTime(value),
            exitTime,
            duration,
            cost,
          };
        } else {
          // Otherwise, add the car's parking information
          newParkingInfo.push({
            carIdentifier,
            entryTime: formatTime(value),
            exitTime,
            duration,
            cost,
          });
        }
      } else if (index !== -1) {
        // If the slot is empty and the car's information is in the parkingInfo array, remove it
        newParkingInfo.splice(index, 1);
      }
    }
  });

  // Update the parking information
  setParkingInfo(newParkingInfo);
}, [data, parkingInfo]);

  return (
    <div className="p-5">
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entry Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exit Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration (s)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Charge (ETB)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parkingInfo.map((car, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.carIdentifier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.entryTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                10:40
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ETB{car.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingTable;
