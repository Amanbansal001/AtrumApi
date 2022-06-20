'use strict';

module.exports = {
  up: function (queryInterface) {

    const channels_master_data = ['DSA'];
    const business_entity_master_data = ['Business','Properitor'];
    const beneficiary_relation_master_data = ['Brother','Mother','Father','Sister']

    const channels_master = [];
    const business_entity_master = [];
    const beneficiary_relation_master = [];

    channels_master_data.forEach(function(e){
      channels_master.push({
        name: e,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })

    business_entity_master_data.forEach(function(e){
      business_entity_master.push({
        name: e,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })

    beneficiary_relation_master_data.forEach(function(e){
      beneficiary_relation_master.push({
        name: e,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
     
    

    queryInterface.bulkInsert('channels_master', channels_master, {});
    queryInterface.bulkInsert('business_entity_master', business_entity_master, {});

    return queryInterface.bulkInsert('beneficiary_relation_master', beneficiary_relation_master, {});;
  },

  down: function (queryInterface) {
    //return queryInterface.bulkDelete('users', null, {});
  }
};
