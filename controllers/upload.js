export const upload = async (req, res) => {
  try {
    res.status(200).json({ result: "上传成功" });
  } catch (error) {
    res.status(500).json(error);
  }
};
