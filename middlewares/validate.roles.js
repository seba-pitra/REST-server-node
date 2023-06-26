const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  const { user } = req;
  const { rol, name } = user;

  if(!user) {
    return res.status(500).json({ msg: 'Attemp of verifying role without verifing token' })
  }
  
  if(rol !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `${name} is not an admin` })
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    const { user } = req;

    if(!user) {
      return res.status(500).json({ msg: 'Attemp of verifying role without verifing token' })
    }

    if( !roles.includes(user.rol) ) {
      return res.status(401).json({ msg: `Service requires one of this roles: ${ roles }`, rol: user.rol })
    }
    
    next();
  }
};

module.exports = {
  isAdminRole,
  hasRole,
}