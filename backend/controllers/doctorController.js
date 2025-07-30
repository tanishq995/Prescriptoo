import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability=async(req,res)=>{
  try {
    const {docId} =req.body

    const docData =await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
    res.json({success:true, message:'Avalability Changed'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const doctorList=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({}).select(['-password','-email'])

    res.json({success:true,doctors})

  } catch (error) {
     console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API for doctor login
const loginDoctor =async(req,res)=>{
  try {
    
    const {email, password} = req.body
    const doctor = await doctorModel.findOne({email})
    if (!doctor) {
      return res.json({success:false,message:"Invalid Credentials"})
    }
    const isMatch = await bcrypt.compare (password, doctor.password )

    if (isMatch) {
      
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid Credentials"})
    }


  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

//  API to get dotor appointments for doctor panel
// const appointmentsDoctor = async(req,res)=>{
//   try {
    
//     const {docId}= req.body
//     const appointments= await appointmentModel.find({docId})

//     res.json({success:true, appointments})

//   } catch (error) {
//      console.log(error)
//     res.json({success:false,message:error.message})
//   }
// }
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctor._id; // ✅ get doctor id from middleware
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark apppointment copleted for docotr panel
// const appointmentComplete=async(req, res)=>{
//   try {
//     const {docId, appointmentId}= req.body

//     const appointmentData =await appointmentModel.findById(appointmentId)

//     if(appointmentData && appointmentData.docId ===docId){
//       await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
//       return res.json({success:true,message:'appointment Completed'})
//     }else{
//       return res.json({success:false,message:'Mark Failed'})
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor._id; // ✅ Get from token

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && String(appointmentData.docId) === String(docId)) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Mark Failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API to cancel apppointment  for docotr panel
// const appointmentCancel=async(req, res)=>{
//   try {
//     const {docId, appointmentId}= req.body

//     const appointmentData =await appointmentModel.findById(appointmentId)

//     if(appointmentData && appointmentData.docId ===docId){
//       await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
//       return res.json({success:true,message:'appointment Cancelled'})
//     }else{
//       return res.json({success:false,message:'Cancellation Failed'})
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor._id;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && String(appointmentData.docId) === String(docId)) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    } else {
      return res.json({ success: false, message: 'Cancellation Failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  API to get dashboard data for docotr panel
// const doctorDashboard= async(req, res)=>{
//   try {
//     const {docId}= req.body

//     const appointments = await appointmentModel.find({docId})

//     let earnings =0

//     appointments.map((item)=>{
//       if (ClipboardItem.isCompleted || item.payment) {
//         earnings+=item.amount
//       }
//     })
//     let patients=[]
//     appointments.map((item)=>{
//       if (!patients.includes(item.userId)) {
//         patients.push(item.userId)
//       }
//     })

//     const dashData={
//       earnings,
//       appointments:appointments.length,
//       patients:patients.length,
//       latestAppointments: appointments.reverse().slice(0,5)
//     }

//     res.json({success:true, dashData})

//   } catch (error) {
//      console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctor._id;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount || 0;
      }
    });

    let patients = [];

    appointments.forEach((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice(-5).reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for doctor panel
const doctorProfile=async(req,res)=>{
  try {
   const docId = req.doctor._id;
const profileData = await doctorModel.findById(docId).select('-password');

    res.json(
      {success:true, profileData}
    )
    
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//  Api to update doctor profile data from doctor panel

const updateDoctorProfile= async(req,res)=>{

  try {

  const docId = req.doctor._id;
const { fees, address, available } = req.body;
await doctorModel.findByIdAndUpdate(docId, { fees, address, available });


    res.json({success:true, message:'Profile Updated'})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete, doctorDashboard,updateDoctorProfile,doctorProfile }