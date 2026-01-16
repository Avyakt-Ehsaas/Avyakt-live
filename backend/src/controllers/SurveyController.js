import Survey from "../models/Survey.js";
import Question from "../models/Question.js";
import SurveyResponse from "../models/SurveyResponse.js";

// route post api/surveys/create

export const createSurvey = async(req,res) => {
    try {
        const {title , description , isActive , questions} = req.body;

        if(!title) {
            return res.status(400).json({message : "Survey title is missing"});
        }
        console.log(title)
        console.log(description);
        console.log(questions);
        console.log(isActive)
        const survey = await Survey.create({
            title,
            description,
            isActive: isActive ? true : false,
            createdBy : req.user._id
        });

        let createdQuestions = []

        if(questions && Array.isArray(questions) && questions.length > 0){
            const allowedTypes = ["mcq", "multi", "text", "rating", "scale", "yesno", "dropdown"];

            const formattedQuestions = questions.map( (q,index) => {
                if(!q.questionText || !q.type){
                    throw new Error("Each question must have a question text and type");
                }

                if(!allowedTypes.includes(q.type)){
                    throw new Error(`Invalid question type ${q.type}`);
                }
               if (
  ['mcq','multi','dropdown','rating','scale'].includes(q.type) &&
  (!q.options || !q.options.length)
) {
   throw new Error("Options are required...");
}

                // Format options to match the Question model schema
                const formattedOptions = q.options ? q.options.map(option => ({
                    label: option.text || '',
                    value: option.text || ''
                })) : [];
                
                return {
                    survey : survey._id,
                    questionText : q.questionText,
                    type : q.type,
                    options : formattedOptions,
                    required : q.required || false,
                    order : q.order ??  index+1
                }
            }
        )
        createdQuestions = await Question.insertMany(formattedQuestions);
        }

        res.status(200).json({
            success : true,
            message : "Survey Created",
            survey,
            questions : createdQuestions
        })        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to create survey"
        })
    }
}

// update survey 
// put  /api/surveys/:id

export const updateSurvey = async (req,res) => {
    try {
        const surveyId = req.params.id;

        if(!surveyId){
            return res.status(400).json({message : "Survey id is missing"});
        }
        
        const {title,description,isActive} = req.body;

        if(!title){
            return res.status(400).json({message : "Survey title is missing"});
        }

        if(!description){
            return res.status(400).json({message : "Survey description is missing"});
        }

        if(isActive === undefined){
            return res.status(400).json({message : "Survey active status is missing"});
        }

        const survey = await Survey.findById(surveyId);
        
        if (!survey) {
        return res.status(404).json({
            success: false,
            message: "Survey not found"
        });
        }   

        survey.title = title ?? survey.title;
        survey.description = description ?? survey.description;
        survey.isActive = isActive ?? survey.isActive;

        const updated = await survey.save();

    res.json({ success: true, survey: updated });

    } catch (error) {
         res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to update survey"
        })
    }
}

// publish survey 
// put  /api/surveys/:id/publish

export const publishSurvey = async (req, res) => {
  try {
    const { isActive } = req.body;

    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.isActive = isActive;
    await survey.save();

    res.json({
      success: true,
      message: `Survey ${isActive ? "published" : "unpublished"} successfully`,
      survey
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all surveys 
// get /api/surveys 

export const getAllSurveys = async(req,res) => {
    try {
        const surveys = await Survey.find().sort({createdAt : -1});
        res.status(200).json({
            success : true,
            message : "Surveys fetched successfully",
            surveys,
            count : surveys.length
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to get all surveys"
        })
    }
}

// get active survey 
// get /api/surveys/active

export const getActiveSurveys = async(req,res) => {
    try {
        const activeSurveys = await Survey.find({isActive : true}).sort({createdAt : -1})
        res.status(200).json({
            success : true,
            message : "Active surveys fetched successfully",
            activeSurveys,
            count : activeSurveys.length
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to get active surveys"
        })
    }
}

export const getServeyById = async(req,res) => {
    try {
        const surveyId = req.params.id;
        if(!surveyId){
            return res.status(400).json({
                success : false,
                message : "Survey id is missing"
            })
        }

        const survey = await Survey.findById(surveyId)
        const questions = await Question.find({survey : surveyId}).sort({order : 1})

        return res.status(200).json({
            success : true,
             message : "Server Fetched Successfully",
             survey,
             questions
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to get survey by id"
        })
    }
}


//    Question Controller 

// add Questions to a survey
// post /api/surveys/:id/add-questions

export const addQuestionsToSurvey = async(req,res) => {
    try {
        const surveyId = req.params.id;
        const { questionText , type , options , required , order } = req.body;

        if(!surveyId) return res.status(400).json({success : false,message : "Survey id is missing"})

        const survey = await Survey.findById(surveyId);
        if (!survey) {
          return res.status(404).json({ success: false, message: "Survey not found" });
        }

        const allowedTypes = ["mcq", "multi", "text", "rating", "scale", "yesno", "dropdown"];

        if(!allowedTypes.includes(type)){
            return res.status(400).json({success : false,message : "Invalid question type"})
        }

      if (
  ['mcq','multi','dropdown','rating','scale'].includes(type) &&
  (!options || !options.length)
) {
  return res.status(400).json({
    success: false,
    message: "Options are required for this question type"
  });
}


        let finalOrder = order;
        if(!finalOrder){
            const last = await Question.findOne({survey : surveyId}).sort({order : -1})
            finalOrder = last ? last.order + 1 : 1;
        }

        const question = await Question.create({
            survey : surveyId,
            questionText,
            type,
            options : options || [] ,
            required :  required || false,
            order : finalOrder
        })
        return res.status(200).json({
            success : true,
            message : "Question added successfully",
            question
        })
    } catch (error) {
     return res.status(500).json({
        success : false,
        message : "Internal Server Error, Unable to add questions to survey",
        error : error.message
     })   
    }
}

// update questions to a survey
// put /api/surveys/update-questions/:id

export const updateQuestion = async(req,res) => {
    try {
        const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const { questionText, type, options, required } = req.body;

    question.questionText = questionText ?? question.questionText;
    question.type = type ?? question.type;
    question.options = options ?? question.options;
    question.required = required ?? question.required;

    const updated = await question.save();
    return res.status(200).json({
        success :  true,
        message : "Question updated suceessfully",
        updated
    })  
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to update question",
            error : error.message
        })
    }
}


// delete question 
// delete  api/surveys/question/:id

export const deleteQuestion = async(req,res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({
                success : false , 
                message : "Question not found"
            })
        }
        await question.deleteOne();
        return res.status(200).json({
            success :  true,
            message : "Question Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error, Unable to delete question",
            error : error.message
        })
    }
}



// submitting survey response
// post api/surveys/:id/submit 
export const SubmitSurveyResponse = async(req,res)=> {
  try {
    const surveyId = req.params.id;
    const { answers, email } = req.body;

    const survey = await Survey.findById(surveyId);
    if (!survey || !survey.isActive) {
      return res.status(400).json({
        success: false,
        message: "Survey not found or not active",
      });
    }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers are required"
      });
    }

    // Anonymous user email validation
    if (!req.user && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for anonymous users"
      });
    }

    // Fetch all questions for validation
    const questions = await Question.find({ survey: surveyId });

    // Check required questions
    const requiredQuestions = questions.filter(q => q.required);
    const answeredQuestionIds = answers.map(a => a.question.toString());

    for (let rq of requiredQuestions) {
      if (!answeredQuestionIds.includes(rq._id.toString())) {
        return res.status(400).json({
          success: false,
          message: `Required question missing: ${rq.questionText}`
        });
      }
    }

    const response = await SurveyResponse.create({
      survey: surveyId,
      user: req.user ? req.user._id : null,
      email: email,
      answers
    });

    return res.status(200).json({
      success: true,
      message: "Survey Response Submitted Successfully",
      response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Unable to Submit Survey Response",
      error: error.message
    });
  }
};

// get survey response 
// get api/surveys/:id/responses

export const getSurveyResponses = async(req,res) => {
    try {
        const surveyId = req.params.id;
        if(!surveyId){
            return res.status(400).json({
                success  : false,
                message : "Survey not found"
            })
        }

        const responses = await SurveyResponse.find({survey : surveyId})
        .populate("user","name email")
        .populate("answers.question", "questionText type options required order")

        const total = responses.length;
        const registered = responses.filter(response => response.user !== null).length;
        const anonymous = responses.filter(response => response.user === null).length;

        return res.status(200).json({
            success : true,
            message : "Survey Response Fetched Successfully",
            responses ,
            stats : {
                totalResponses : total,
                registeredUsers  : registered,
                anonymousUsers : anonymous
            }
        })
    } catch (error) {
        return res.status(500).json({
            success :  false ,
             message :  "Internal server error , Unable to get servey reposnse"
        })
    }
}


