"use client";
import { Button } from "@/components/ui/button";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import { chatSession } from "@/service/AImodal";
import { toast } from "sonner"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const isFormValid = () => {
    return (
      formData?.noOfDays > 0 &&
      formData?.noOfDays <= 10 &&
      formData?.location &&
      formData?.traveler &&
      formData?.budget
    );
  };

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }


   
    if (!isFormValid()) {
      toast.error("Please fill all the information correctly.", {
        duration: 5000,
      });
      return;
    }
  
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
  
    // console.log(FINAL_PROMPT);
    setLoading(true); // Start loading
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      SaveAiTrip(result?.response?.text())
      toast.success("Trip generated successfully!", {
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate trip. Please try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false); // Stop loading
    }
    SaveAiTrip(result?.response?.text())
  };

  const SaveAiTrip = async(TripData) => {
    setLoading(true); 
    
    const user= JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData) ,
      userEmail: user?.email,
      id:docId

});
setLoading(false);
navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      onGenerateTrip(); // After login, trigger the trip generation.
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };
  
  
  return (
    <>
      <div className="mt-10">
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 p-5 ">
          <h2 className="font-bold text-3xl text-[#f56551]">
            Tell us your travel preferences 🏕️🌴
          </h2>
          <p className="mt-3 text-gray-500 text-xl ">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>

          <div>
            <h2 className="text-xl my-3 font-medium text-black">
              What is the destination of your choice?
            </h2>
            <input
              placeholder="Destination"
              className="border-2 border-gray-300 text-black p-2 rounded-md"
              onChange={(e) => {
                const value = e.target.value;
                setPlace(value);
                handleInputChange("location", value);
              }}
            />
          </div>

          <div className="pt-10">
            <h2 className="text-xl my-3 font-medium text-black">
              How many days are you planning your trip?
            </h2>
            <input
              type="number"
              placeholder="Number of days"
              className="border-2 border-gray-300 text-black p-2 rounded-md "
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div className="pt-10">
            <h2 className="text-xl my-3 font-medium text-black">
              What is Your Budget?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                    ${formData?.budget === item.title && "shadow-lg border-black"}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="text-bold text-lg text-black">{item.title}</h2>
                  <h2 className="text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10">
            <h2 className="text-xl my-3 font-medium text-black">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelsList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                    ${formData?.traveler === item.people && "shadow-lg border-black"}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="text-bold text-lg text-black">{item.title}</h2>
                  <h2 className="text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className="my-10 flex justify-end">
            <Button onClick={onGenerateTrip} disabled={loading || !isFormValid()}>
              {loading ? 'Generating...' : 'Generate Trip'}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
             <img src="/logo.svg"/>
             <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
             <p>Sign in to the App with Google authentication securely</p>

             <Button 
             disabled={loading}
             onClick={login}
             className="w-full mt-5 flex gap-4 items-center">
              
             
             <FcGoogle className='h-7 w-7' />Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTrip;
