import Address from "../models/Address.js";

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addAddress = async (req, res) => {
  try {
    const data = { ...req.body, user: req.user._id };
    if (data.isDefault)
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    const address = await Address.create(data);
    res.status(201).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.isDefault)
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    const address = await Address.findOneAndUpdate(
      { _id: id, user: req.user._id },
      data,
      { new: true }
    );
    res.status(200).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findOneAndDelete({ _id: id, user: req.user._id });
    res.status(200).json({ success: true, message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
