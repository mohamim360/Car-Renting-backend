import { Rent } from "../rent/rent.model";
import { IBid } from "./bid.interface";
import { Bid } from "./bid.model";

const createBid = async (bid: IBid) => {
  return await Bid.create(bid);
};

const findBidById = async (bidId: string) => {
  return await Bid.findById(bidId)
    .populate("rentId")
    .populate("driverId");
};

const updateBidById = async (bidId: string, payload: Partial<IBid>) => {
  const result = await Bid.findByIdAndUpdate({ _id: bidId }, payload, {
    new: true,
    runValidators: true,
  });

  // If bid is accepted, update the rent with driver info and change status
  if (result?.bidStatus === "accepted") {
    // Update the rent with the driver and change status to ongoing
    const updatedRent = await Rent.findByIdAndUpdate(
      { _id: result.rentId },
      { 
        driver: result.driverId,  // Assign driver to rent
        rentStatus: "ongoing"     // Change status to ongoing
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("user").populate("car").populate("driver");

    // Optionally: Reject all other pending bids for this rent
    await Bid.updateMany(
      { 
        rentId: result.rentId, 
        _id: { $ne: bidId },  // Exclude current bid
        bidStatus: "pending"   // Only update pending bids
      },
      { 
        bidStatus: "rejected" 
      }
    );

    return updatedRent;
  }
  
  return result;
};

const deleteBidById = async (bidId: string) => {
  const result = await Bid.findByIdAndDelete(bidId);
  return result;
};

const getAllBids = async () => {
  return await Bid.find()
    .populate({
      path: "rentId",
      populate: [
        { path: "user" },
        { path: "car" }
      ]
    })
    .populate("driverId");
};

export const BidService = {
  createBid,
  findBidById,
  updateBidById,
  deleteBidById,
  getAllBids,
};