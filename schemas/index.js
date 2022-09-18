const offerType = require("./typeDefs/offerType.js")
let data = require("../data")
const graphql = require("graphql");

const {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString, 
    GraphQLList} = graphql


const rootQuery = new GraphQLObjectType({
    name:"rootQueryType",
    fields:{
        getAllOffers:{
            type: new GraphQLList(offerType),
            resolve(parent,args){
                return data
            }
        },
        findOffer:{
            type: new GraphQLList(offerType),
            args:{
                title:{ type:GraphQLString },
                companyName: { type:GraphQLString },
                jobDescription: { type:GraphQLString },
                techSkills: { type:GraphQLList(GraphQLString) }, 
                companyField: { type:GraphQLString },
                companyLocation: { type:GraphQLString },
            },
            resolve(parent,args){

                let offer = [] 
                
                if(args.title != undefined){

                    const offerTitle = args.title
                    offer = data.filter(offers=>offers.title === offerTitle )

                }else if(args.companyName != undefined){

                    const offerCompanyName = args.companyName
                    offer = data.filter(offers=>offers.companyName === offerCompanyName )

                }else if(args.jobDescription != undefined){

                    const offerJobDescription = args.jobDescription
                    offer = data.filter(offers=>offers.jobDescription === offerJobDescription )

                }else if(args.techSkills != undefined){

                    const offerTechSkills = args.techSkills
                    offer = data.filter(offers=>offers.techSkills === offerTechSkills )

                }else if(args.companyField != undefined){

                    const offerCompanyField = args.companyField
                    offer = data.filter(offers=>offers.companyField === offerCompanyField )

                }else if(args.companyLocation != undefined){

                    const offerCompanyLocation = args.companyLocation
                    offer = data.filter(offers=>offers.companyLocation === offerCompanyLocation )

                }
                return offer
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createOffer:{
            type:offerType,
            args:{
                title:{ type:GraphQLString },
                companyName: { type:GraphQLString },
                jobDescription: { type:GraphQLString },
                techSkills: { type:GraphQLList(GraphQLString) }, 
                companyField: { type:GraphQLString },
                companyLocation: { type:GraphQLString },
            },
            resolve(parent, args){
                data.push({
                    title: args.title,
                    companyName: args.companyName,
                    jobDescription: args.jobDescription,
                    techSkills: args.techSkills, 
                    companyField: args.companyField,
                    companyLocation: args.companyLocation,
                })
                return args
            }
        },

        deleteOffer:{
            type:offerType,
            args:{
                title:{ type:GraphQLString },
            },
            resolve(parent, args){
                console.log("primera data",data.title)
                let e = data.filter(offer=>offer.title!= args.title)
                data =[ ...e]
                return data
            }
        },

        updateOffer:{
            type:offerType,
            args:{
                title:{ type:GraphQLString },
                newTitle:{type:GraphQLString},
                companyName: { type:GraphQLString },
                jobDescription: { type:GraphQLString },
                techSkills: { type:GraphQLList(GraphQLString) }, 
                companyField: { type:GraphQLString },
                companyLocation: { type:GraphQLString },
            },
            resolve(parent, args){
                
                let valueTitle = ""
                let valueName = ""
                let valueDesc = ""
                let valueSkills = []
                let valueField = ""
                let valueLocation = ""
                
                let offerToUpdate = []

                if(args.newTitle != undefined){
                    valueTitle = args.newTitle
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'title': valueTitle}:{...offer}) 
                    data = [...offerToUpdate]
                } 

                if(args.companyName != undefined){
                    valueName = args.companyName
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'companyName': valueName}:{...offer})  
                    data = [...offerToUpdate]
                } 
                if(args.jobDescription != undefined){
                    valueDesc = args.jobDescription
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'jobDescription': valueDesc}:{...offer})  
                     data = [...offerToUpdate]
                   
                } 
                if(args.techSkills != undefined){
                    valueSkills = args.techSkills
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'techSkills': valueSkills}:{...offer}) 
                    data = [...offerToUpdate]
                }
                if(args.companyField!= undefined){
                    valueField = args.companyField
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'companyField': valueField}:{...offer}) 
                    data = [...offerToUpdate]
                }
                if(args.companyLocation != undefined){
                    valueLocation = args.companyLocation
                    offerToUpdate = data.map(offer=>offer.title == args.title?{...offer, 'companyLocation': valueLocation}:{...offer}) 
                    data = [...offerToUpdate]
                }
                return args
                
            }

        }
    }
})

module.exports =  new GraphQLSchema({ query: rootQuery, mutation:mutation })