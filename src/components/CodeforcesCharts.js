import React,{useEffect,useState} from 'react';
import {
    Chart as ChartJS,  Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


ChartJS.register( Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title);



export default function CodeforcesCharts({handle}) {

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    // console.log(url);
    const [user, setUser] = useState({});
    const [ratingData, setRatingData] = useState([]);
   useEffect(() => {
       const fetchData = async() => {
           const response = await axios.get(url);
           console.log(response.data.result[0]);
           setUser(response.data.result[0]);
           const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
           setRatingData(ratingResponse.data.result);
        }
       fetchData();
   }, []);

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        let fdate = "";
        fdate = date.getDate();
        fdate += '-';
        fdate += date.getMonth() + 1;
        fdate+='-'
        fdate += date.getFullYear();
        return fdate;
    };

    return <div className=' border-[2px] border-dotted border-green-500 flex flex-col'>
        <h1 className='font-bold uppercase text-indigo-700 text-3xl'>CodeForces Stats</h1>


        <div className="container mx-auto p-8">
            {user ? (
                <div className="bg-gray-200 rounded-lg p-8 flex flex-col items-center md:flex-row md:items-start md:space-x-20">
                    <img src={user.titlePhoto} alt="User Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white" />
                    <div className="text-gray-900 mt-4 md:mt-0">
                        <h2 className="text-3xl font-bold mb-4 font-serif">
                            <span className="text-blue-500">Handle Name:</span> {user.handle}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded bg-blue-500">
                                <p className="text-lg font-semibold text-white font-sans">Rating</p>
                                <p className="text-2xl font-bold text-white font-sans">{user.rating}</p>
                            </div>
                            <div className="p-4 rounded bg-green-500">
                                <p className="text-lg font-semibold text-white font-sans">Max Rating</p>
                                <p className="text-2xl font-bold text-white font-sans">{user.maxRating}</p>
                            </div>
                            <div className="p-4 rounded bg-yellow-500">
                                <p className="text-lg font-semibold text-white font-sans">Present Rank</p>
                                <p className="text-2xl font-bold text-white font-sans">{user.rank}</p>
                            </div>
                            <div className="p-4 rounded bg-purple-500">
                                <p className="text-lg font-semibold text-white font-sans">Max Rank</p>
                                <p className="text-2xl font-bold text-white font-sans">{user.maxRank}</p>
                            </div>
                        </div>
                    </div>
                    <div className=' h-[500px] w-[400px]  items-center md:w-[500px] lg:w-[700px]'>
                        <Line
                            data={{
                                labels: ratingData.map(item => formatTime(item.ratingUpdateTimeSeconds)),
                                datasets: [
                                    {
                                        label: 'Rating',
                                        data: ratingData.map(item => item.newRating),
                                        fill: false,
                                        borderColor: 'blue',
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>


    </div>
}
