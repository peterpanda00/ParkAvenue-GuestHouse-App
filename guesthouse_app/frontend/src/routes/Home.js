import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import supabase from "../config/supabaseClient";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { FaDoorClosed } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';


function Home() {


  const [selectedChart, setSelectedChart] = useState('Revenue');
 

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
          <strong>12</strong>
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
          <strong>12</strong>
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
      

      </Row>
      </div>
      
    </div>
  );
}

export default Home;