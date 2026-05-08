import React, { useEffect, useMemo } from 'react';
import { useBooking } from "../../../context/AuthContext.jsx"; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import './Booking.css';

const Booking = () => {
  const { bookings, fetchAllBookings, counts, fetchGlobalStats, loading } = useBooking();

  useEffect(() => {
    fetchAllBookings(); 
    fetchGlobalStats();
  }, []);

  const sessionData = useMemo(() => {
    const data = { pending: 0, approved: 0, completed: 0 };
    bookings.forEach((b) => {
      if (data.hasOwnProperty(b.status)) data[b.status]++;
    });
    return [
      { name: 'Pending', count: data.pending, color: '#FFBB28' },
      { name: 'Approved', count: data.approved, color: '#00C49F' },
      { name: 'Completed', count: data.completed, color: '#0C7FDA' },
    ];
  }, [bookings]);

  const userRatioData = [
    { name: 'Students', value: counts.students },
    { name: 'Counsellors', value: counts.counsellors },
  ];

  const RATIO_COLORS = ['#8884d8', '#82ca9d']; 

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="booking">
      
      <div className="box-details">
        <div className="text-details">
          <h1 className="section-title">Platform Overview</h1>
        </div>
        
        <div className="details-box stats-row">
          <div className="box-booking">
            <h1 className="stat-title">Total Students</h1>
            <h2 className="stat-value">{counts.students}</h2>
          </div>
          <div className="box-booking">
            <h1 className="stat-title">Active Counsellors</h1>
            <h2 className="stat-value">{counts.counsellors}</h2>
          </div>
          <div className="box-booking">
            <h1 className="stat-title">Total Sessions</h1>
            <h2 className="stat-value">{bookings.length}</h2>
          </div>
        </div>
      </div>


      <div className="box-details graphs-section">
        <div className="graphs-wrapper">
          
          
          <div className="graph-container">
            <h3 className="graph-title">Session Status (Counts)</h3>
            
            <div className="chart-box-fix">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sessionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count">
                    {sessionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="graph-container">
            <h3 className="graph-title">User Distribution (%)</h3>
            <div className="chart-box-fix">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userRatioData}
                    cx="50%" cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userRatioData.map((entry, index) => (
                      <Cell key={`cell-pie-${index}`} fill={RATIO_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;