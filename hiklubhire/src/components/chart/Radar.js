import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Typography } from "@mui/material";

/**
 * Sistema de Transformación de las puntiaciones por posiciones
 * Pasos:
 *  1.- El array se divide en 5 sub-arrays de 3 posiciones
 *  2.- las posiciones de cada uno de los bloques se transforman en
 * 
 * 2.1 .- Los sub-arrays 1,2,4 y 5 se transforman asi:
 * 
 *
           * Array 3
           * puntuacion    1 2 3 4
           * posicion   0  1 2 3 4
           *            1  1 2 3 4
           *            2  4 3 2 1
           *
           * resultado 1 1 4 -> ok
 */
export default function Radar() {
const [array, setArray] = useState([3,3,2,1,4,4,1,4,4,1,1,3,3,2,4])
const [radar, setRadar] = useState();
const [isRadar, setIsRadar] = useState(false);

  function calculateRadarData(array) {
    if (array && affinity.length === 15) {
      const resultado = chunkArray(affinity, 3);
      //console.log("arrays resultado", resultado);
      let contador = 0;
      var pentaData = [];
      resultado.forEach((subarray) => {
        //console.log("arrays", subarray, contador);
        contador++;
        if (contador === 3) {
          let pentaAux = [];
          subarray.forEach(function (value, i) {
            //console.log("%d: %s", i, value);
            if (i === 2) {
              switch (value) {
                case 1:
                  pentaAux.push(4);
                  break;
                case 2:
                  pentaAux.push(3);
                  break;
                case 3:
                  pentaAux.push(2);
                  break;
                case 4:
                  pentaAux.push(1);
                  break;

                default:
                  break;
              }
            } else {
              switch (value) {
                case 1:
                  pentaAux.push(1);
                  break;
                case 2:
                  pentaAux.push(2);
                  break;
                case 3:
                  pentaAux.push(3);
                  break;
                case 4:
                  pentaAux.push(4);
                  break;

                default:
                  break;
              }
            }
          });
          const reducer = (accumulator, curr) => accumulator + curr;
          pentaData.push(pentaAux.reduce(reducer));
          //console.log("pentadata suma", pentaData);
          
        } else {
          let pentaAux = [];
          subarray.forEach(function (value, i) {
            //console.log("%d: %s", i, value);

            if (i === 0) {
              switch (value) {
                case 1:
                  pentaAux.push(4);
                  break;
                case 2:
                  pentaAux.push(3);
                  break;
                case 3:
                  pentaAux.push(2);
                  break;
                case 4:
                  pentaAux.push(1);
                  break;

                default:
                  break;
              }
            } else {
              switch (value) {
                case 1:
                  pentaAux.push(1);
                  break;
                case 2:
                  pentaAux.push(2);
                  break;
                case 3:
                  pentaAux.push(3);
                  break;
                case 4:
                  pentaAux.push(4);
                  break;
                default:
                  break;
              }
            }
          });

          const reducer = (accumulator, curr) => accumulator + curr;
          pentaData.push(pentaAux.reduce(reducer));
          //console.log("pentadata suma", pentaData);
          /**
           * Array 0, 1 2 y 4
           * puntuacion    1 2 3 4
           * posicion   0  4 3 2 1
           *            1  1 2 3 4
           *            2  1 2 3 4
           */
        }
      });
      setRadar(pentaData);
      setIsRadar(true);
    } else {
      setIsRadar(false);
    }
  }

  const options = {
    responsive: true,
    aspectRatio: 1,
    //maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18,
          },
          color: "#93C01F",
        },
      },
    },
    scales: {
      r: {
        grid: {
          display: true,
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 3,
        suggestedMax: 12,
        ticks: {
          stepSize: 2,
          color: "#93C01F",
          font: {
            size: 14,
          },
        },
        pointLabels: {
          padding: 2,
          color: "#93C01F",
          font: {
            family: "ASAP",
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: [
      "RE",
      "A",
      "AM",
      "Ex",
      "EM",
    ],
    datasets: [
      {
        label: "Pon tu nombre aqui",
        data: radar,
        backgroundColor: "rgba(147, 192, 31, 0.6)",
        borderColor: "#93C01F",
        borderWidth: 1,
      },
    ],
  };

  return isRadar ? (
    <Radar data={data} options={options} />
  ) : (
    <Typography variant="h6">Sin datos</Typography>
  );
}
