import React, { useState,useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import supabase from "../config/supabaseClient";
import { Row, Col, Card, Table,CardBody, Container } from 'react-bootstrap';
import { FaDoorClosed,FaDoorOpen,FaBed,FaSearch  } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';


function Home() {
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [allfetchError,setAllFetchError] = useState(null)
  const [bookingList,setBookingList] = useState([])
  const [allBookingList,setAllBookingList] = useState([])
  const [dataList,setDataList] = useState([])
  const [allbookingCount, setAllBookingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedChart, setSelectedChart] = useState('Revenue');
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentList,setPaymentList] = useState([]);
  const bookingsPerPage = 5;
  let totalRevenue = 0; 

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;


  useEffect(() => {
    console.log(supabase)
  
      fetchBookings(currentPage);
      fetchPayments();
      fetchAllBookings();
      fetchData();
      console.log(bookingList);
      console.log(dataList);
      console.log(paymentList);
      console.log(filteredbookingList);
    


  }, []);



  const fetchPayments = async () => {
    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const { data: paymentData, error: paymentDataError } = await supabase
            .from('payments')
            .select('AmountPaid, PaymentDate') 
            .gte('PaymentDate', startOfMonth.toISOString())
            .lte('PaymentDate', endOfMonth.toISOString());

        if (paymentData) {
            // Calculate total revenue for this month
            totalRevenue = paymentData.reduce((acc, payment) => acc + payment.AmountPaid, 0);
            
            setPaymentList(paymentData);
            console.log(paymentData);
        }

        if (paymentDataError) {
            console.error('Error fetching payments:', paymentDataError);
        }
    } catch (error) {
        console.error('Error fetching payments:', error);
    }
};

  

const fetchBookings = async (pageNumber) => {
  try {
    const today = new Date(); // Get today's date
    const formattedToday = today.toISOString();
      const { data, error } = await supabase
          .from('rooms_bookings')
          .select('*, bookings(*,guests(*)), rooms(*)')
          .range(0, 5); // Limit the results to the first 5

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


  const fetchAllBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms_bookings')
        .select('*, bookings(*,guests(*)), rooms(*)');
      if (error) {
        setFetchError('Could not fetch bookings');
        setAllBookingList([]);
        setAllBookingCount(0);
      }

      if (data) {
        setAllBookingList(data);
        setAllFetchError(null);
        setAllBookingCount(data.length);
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

    const fetchData= async () => {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
      try {
        const { data, error } = await supabase
          .from('rooms_bookings')
          .select('*, bookings(*,guests(*)), rooms(*)')
          .gte('bookings.CheckIn', firstDayOfMonth.toISOString()) 
          .lte('bookings.CheckOut', lastDayOfMonth.toISOString());
    
        if (error) {
          setFetchError('Could not fetch data');
          setDataList([]);
        }
    
        if (data) {
          setDataList(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    const arrivalsCount = allBookingList.filter(booking => booking.bookings.Status === "Confirmed").length;
    const departuresCount = allBookingList.filter(booking => booking.BookingStatus === "Completed").length;
    const occupiedRoomsCount = allBookingList.filter(booking => booking.BookingStatus  === "Staying").length;
    const guestStayingCount = allBookingList.reduce((total, booking) => {
      if (booking.BookingStatus === "Staying") {
          return total + booking.bookings.NumGuests;
      }
      return total;
  }, 0);
    const reservationCount = allBookingList.filter(booking => booking.BookingStatus  === "Active").length;

  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };

  const revenueData = {
    labels: ['March', 'April'],
    datasets: [
      {
        label: 'Revenue Chart',
        backgroundColor: '#9A8D88',
        borderColor: '#9A8D88',
        borderWidth: 1,
        hoverBackgroundColor: '#665651',
        hoverBorderColor: '#665651',
        data: [100, 200],
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
  const totalPages = Math.ceil(filteredbookingList.length / bookingsPerPage);
  // Slice the list of bookings to display only the ones for the current page

  const currentBookings = filteredbookingList.slice(indexOfFirstBooking, indexOfLastBooking);

  console.log(supabase)
  return (
    
    <div style={{ width: '100%', background: '#F2EFEB', color: '#665651', display:'flex'}}>
      
      <Sidebar/>
      <div style={{ background: '#F2EFEB', color: '#665651', display:'flex', padding:"100px"}}>
      <Container>
      <Row>
      <Row style={{ height: '300px' }}>
      <Col lg="3" style={{ height: '300px' }} >
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
        <strong>{arrivalsCount}</strong>
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

      <Col lg="3" style={{ height: '300px' }}>
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
        <strong>{departuresCount}</strong>
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
   

      <Col lg="3" style={{ height: '300px' }}>
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
        <strong>{occupiedRoomsCount}</strong>
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
          height: '900px',
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
          <strong>{reservationCount}</strong>
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
          <strong>{guestStayingCount}</strong>
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
          <strong>₱ 20,456</strong>
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

      </Row>

    

<Row style={{width:'900px',height:'600px'}}>

<Card style={{ borderRadius: '20px'}}>

          <CardBody>
          <Row style={{ width: '300px' }}> 
            <Col className="mb-3">
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
              <Table style={{width:'800px',height:'400px'}}>
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
                    {currentBookings.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>No Bookings</td>
                      </tr>
                    ) : (
                      currentBookings.map((room_booking, index) => (
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
                      ))
                    )}
                  </tbody>
              </Table>
              <ul className="pagination" style={{justifyContent:'center'}}>
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                      <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                    <li className={currentPage === totalPages ? 'disabled' : ''}>
                      <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
                    </li>
                  </ul>
          </CardBody>
      </Card>
     


</Row>



      
      

      </Row>

</Container>
      

      

        

      </div>
      
    </div>
  );
}

export default Home;