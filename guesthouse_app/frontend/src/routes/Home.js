import React, { useState,useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import supabase from "../config/supabaseClient";
import { Row, Col, Card, Table,CardBody } from 'react-bootstrap';
import { FaDoorClosed,FaDoorOpen,FaBed,FaSearch  } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';


function Home() {
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [bookingList,setBookingList] = useState([])
  const [bookingCount, setBookingCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedChart, setSelectedChart] = useState('Revenue');

  useEffect(() => {
    console.log(supabase)
  
      fetchBookings();
      console.log(bookingList);
      console.log(filteredbookingList);
    


  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms_bookings')
        .select(
          `
          *,
          bookings: BookingID(CheckIn,CheckOut,Status,guests:GuestID(FirstName,LastName),CreatedAt)
          `
        );
      if (error) {
        setFetchError('Could not fetch bookings');
        setBookingList([]);
        setBookingCount(0);
      }

      if (data) {
        setBookingList(data);
        setFetchError(null);
        setBookingCount(data.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when done fetching
    }
  };


  const filteredbookingList = bookingList
    .filter((booking) => {
      
      return (
        (searchValue === '' ||
          booking.bookings.guests.FirstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          booking.bookings.guests.LastName.toLowerCase().includes(searchValue.toLowerCase())
       
        )
      );
    })
   
 

  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };

  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue Chart',
        backgroundColor: '#9A8D88',
        borderColor: '#9A8D88',
        borderWidth: 1,
        hoverBackgroundColor: '#665651',
        hoverBorderColor: '#665651',
        data: [100, 200, 150, 250, 180],
      },
    ],
  };

  const guestData = {
    labels: ['Single', 'Double', 'Suite'],
    datasets: [
      {
        label: 'Guest Chart',
        backgroundColor: '#9A8D88',
        borderColor: '#9A8D88',
        borderWidth: 1,
        hoverBackgroundColor: '#665651',
        hoverBorderColor: '#665651',
        data: [30, 45, 25],
      },
    ],
  };

  const chartData = selectedChart === 'Revenue' ? revenueData : guestData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFC300';
      case 'Confirmed':
        return '#5F891A';
      case 'Cancelled':
        return '#B32F0C';
      default:
        return 'black'; // Default color if status is not recognized
    }
  };


  console.log(supabase)
  return (
    
    <div style={{ width: '100%', background: '#F2EFEB', color: '#665651', display:'flex'}}>
      
      <Sidebar/>
      <div style={{ width: '100%', background: '#F2EFEB', color: '#665651', display:'flex', padding:"100px"}}>
      <Row>
      <Col lg="3" >
      <Card
          style={{
          height: '250px',
          width: '250px',
          cursor: 'pointer',
          padding: '10px',
          background:'white',
          color: 'white',
          position: 'relative',
          borderRadius:'30px', // Position relative for icon placement
        }}>
          {/* Circle with the FaDoorClosed icon */}
        <div
          style={{
            position: 'absolute',
            top: '40px', // Adjust the top position as needed
            left: '40px', // Adjust the left position as needed
            backgroundColor: '#665651', // Circle color
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaDoorClosed style={{ color: 'white', width: '30px',height: '30px', }} />
        </div>
         <Card.Title style={{ marginLeft:'50px',marginTop:'35px',textAlign: 'center', color: '#665651',fontSize:'30px' }}><strong>Arrivals</strong></Card.Title>
       <Card.Text style={{  textAlign: 'right', color: '#665651', fontSize:'64px', margin:'30px'  }}>
        <strong>5</strong>
        <div
          style={{
            backgroundColor: '#665651',
            height: '50px',
            width: '20px',
            marginLeft: '190px',
            position: 'absolute',
            bottom:'50px'
          }}
        ></div>
       </Card.Text>
       
      </Card>
      </Col>

      <Col lg="3">
      <Card
          style={{
          height: '250px',
          width: '250px',
          cursor: 'pointer',
          padding: '10px',
          background:'white',
          color: 'white',
          position: 'relative',
          borderRadius:'30px', // Position relative for icon placement
        }}>
          {/* Circle with the FaDoorClosed icon */}
        <div
          style={{
            position: 'absolute',
            top: '40px', // Adjust the top position as needed
            left: '15px', // Adjust the left position as needed
            backgroundColor: '#665651', // Circle color
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaDoorOpen style={{ color: 'white', width: '30px',height: '30px', }} />
        </div>
         <Card.Title style={{ marginLeft:'50px',marginTop:'35px',textAlign: 'center', color: '#665651',fontSize:'30px' }}><strong>Departures</strong></Card.Title>
       <Card.Text style={{  textAlign: 'right', color: '#665651', fontSize:'64px', margin:'30px'  }}>
        <strong>12</strong>
        <div
          style={{
            backgroundColor: '#665651',
            height: '50px',
            width: '20px',
            marginLeft: '190px',
            position: 'absolute',
            bottom:'50px'
          }}
        ></div>
       </Card.Text>
       
      </Card>
      </Col>

      <Col lg="3">
      <Card
          style={{
          height: '250px',
          width: '250px',
          cursor: 'pointer',
          padding: '10px',
          background:'white',
          color: 'white',
          position: 'relative',
          borderRadius:'30px', // Position relative for icon placement
        }}>
          {/* Circle with the FaDoorClosed icon */}
        <div
          style={{
            position: 'absolute',
            top: '40px', // Adjust the top position as needed
            left: '25px', // Adjust the left position as needed
            backgroundColor: '#665651', // Circle color
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaBed  style={{ color: 'white', width: '30px',height: '30px', }} />
        </div>
         <Card.Title style={{ marginLeft:'50px',marginTop:'35px',textAlign: 'center', color: '#665651',fontSize:'30px' }}><strong>Occupied</strong></Card.Title>
       <Card.Text style={{  textAlign: 'right', color: '#665651', fontSize:'64px', margin:'30px'  }}>
        <strong>3</strong>
        <div
          style={{
            backgroundColor: '#665651',
            height: '50px',
            width: '20px',
            marginLeft: '190px',
            position: 'absolute',
            bottom:'50px'
          }}
        ></div>
       </Card.Text>
       
      </Card>
      </Col>

      <Col lg="3">
      <Card
          style={{
          height: '800px',
          width: '500px',
          cursor: 'pointer',
          padding: '10px',
          background:'white',
          color: 'white',
          position: 'relative',
          borderRadius:'30px', // Position relative for icon placement
        }}>
        
         <Card.Title style={{margin:'20px',textAlign: 'center', color: '#665651',fontSize:'30px' }}><strong>Today's Activities</strong></Card.Title>

       <Card.Text style={{color: 'white', fontSize:'64px', margin:'30px'  }}>
        <Row style={{margin:'10px',  alignItems: 'center',justifyContent:'center'}}>
        <Col>
        <div
          style={{
            backgroundColor: '#665651', // Circle color
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:'20px'
          }}
        >
          <strong>6</strong>
        </div>
        </Col>

        <Col> 
        <div
          style={{
            backgroundColor: '#665651', // Circle color
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:'60px'
          }}
        >
          <strong>8</strong>
        </div>

        
        </Col>
        
        </Row>

        <Row style={{margin:'10px',  alignItems: 'center',justifyContent:'center'}}>
        <Col>
        <div
          style={{
            fontSize:'20px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9A8D88',
            marginLeft:'30px'
          }}
        >
          <strong>Booked</strong>
        </div>
        </Col>
        <Col>
        <div
          style={{
            fontSize:'20px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9A8D88',
            marginLeft:'80px'
          }}
        >
          <strong>Guests</strong>
        </div>
        </Col>
        

        </Row>

        <Row style={{margin:'30px',  alignItems: 'center',justifyContent:'center'}}>
        <div
          style={{
            fontSize:'50px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#665651',
            textAlign:'center'
      
          }}
        >
          <strong>₱ 12,370.28</strong>
        </div>
        <div
          style={{
            fontSize:'20px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9A8D88',
            textAlign:'center'
          }}
        >
          <strong>Total Revenue</strong>
        </div>
        </Row>
       </Card.Text>

       <Card.Title style={{textAlign: 'center', color: '#665651',fontSize:'30px' }}><strong>Statistics</strong></Card.Title>

       <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          style={{
            width: '100px',
            height: '30px',
            border: 'none',
            borderBottom: selectedChart === 'Revenue' ? '2px solid #665651' : 'none',
            backgroundColor: 'white',
            color: '#665651',
          }}
          onClick={() => handleChartChange('Revenue')}
        >
          Revenue
        </button>
        <button
          style={{
            width: '100px',
            height: '30px',
            border: 'none',
            borderBottom: selectedChart === 'Guest' ? '2px solid #665651' : 'none',
            backgroundColor: 'white',
            color: '#665651',
            marginLeft: '10px',
          }}
          onClick={() => handleChartChange('Guest')}
        >
          Guest
        </button>
      </Row>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Bar data={chartData} />


      </Row>


       
      </Card>
      </Col>
      {/*

<Row>
<Col lg="4">
              <form>
                  <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                  overflow: "hidden"}} >
                      <input type="search" className="form-control" placeholder="Search Guest Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                      <button className="btn me-auto" style={{color: "white", backgroundColor: "#665651"}}>
                          <div style={{color: 'white'}}>
                              {React.createElement(FaSearch, { size: 20 })}
                          </div>
                      </button>
                  </div>
              </form>
          </Col>

</Row>

<Row style={{width:'1000px',height:'600px'}}>

<Card style={{ borderRadius: '20px'}}>
          <CardBody>
              <Table style={{width:'900px',height:'400px'}}>
                   <thead>
                      <tr>
                          <th style={{color: '#665651'}}>Booking #</th>
                          <th style={{color: '#665651'}}>Client Name</th>
                          <th style={{color: '#665651'}}>Room Number</th>
                          <th style={{color: '#665651'}}>Check-In Date</th>
                          <th style={{color: '#665651'}}>Status</th>
                          <th style={{color: '#665651'}}></th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredbookingList.map((room_booking, index) => (
                          <React.Fragment key={room_booking.RoomBookingID}>
                              <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                  <td style={{color: '#665651'}}>{room_booking.RoomBookingID}</td>
                                  <td style={{ color: '#665651' }}>
                                  {room_booking.bookings.guests
                                    ? `${room_booking.bookings.guests.FirstName} ${room_booking.bookings.guests.LastName}`
                                    : 'N/A'}
                                </td>
                                  <td style={{color: '#665651'}}>{room_booking.RoomNumber}</td>
                                  <td style={{ color: '#665651' }}>
                                    {room_booking.bookings.CheckIn ? new Date(room_booking.bookings.CheckIn).toLocaleDateString() : 'N/A'}
                                  </td>
                                  <td style={{ color: getStatusColor(room_booking.bookings.Status) }}>
                                  {room_booking.bookings.Status}
                                </td>
                              </tr>
                          </React.Fragment>
                      ))}
                  </tbody>
              </Table>
          </CardBody>
      </Card>


</Row>


                                  */}
      
      

      </Row>

      
      

      

        

      </div>
      
    </div>
  );
}

export default Home;