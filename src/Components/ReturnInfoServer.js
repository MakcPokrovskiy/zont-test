const ReturnInfoServer = ({infoData}) => {
  return (
    <>
      <p className="click-info-server">По версии сервера: {infoData.count} раз</p>
    </>
  )
}

export default ReturnInfoServer;
