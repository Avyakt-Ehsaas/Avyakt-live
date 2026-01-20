import Survey from "../models/Survey.js";
import Question from "../models/Question.js";
import SurveyResponse from "../models/SurveyResponse.js";

// route post api/surveys/create
export const createSurvey = async (req, res) => {
  try {
    const { title, description, isActive, questions, results } = req.body;

    //  Basic validations
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    //  Validate results (VERY IMPORTANT)
    if (!results || !Array.isArray(results) || results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one result keyword is required"
      });
    }

    // 🔹 Create survey
    const survey = await Survey.create({
      title,
      description,
      isActive: Boolean(isActive),
      createdBy: req.user._id,
      results
    });

    let createdQuestions = [];

    //  Create questions if provided
    if (questions && Array.isArray(questions) && questions.length > 0) {

      const allowedTypes = [
        "mcq",
        "multi",
        "text",
        "rating",
        "scale",
        "yesno",
        "dropdown"
      ];

      const resultKeys = results.map(r => r.key);

      const formattedQuestions = questions.map((q, index) => {

        if (!q.questionText || !q.type) {
          throw new Error("Each question must have text and type");
        }

        if (!allowedTypes.includes(q.type)) {
          throw new Error(`Invalid question type: ${q.type}`);
        }

        if (
          ["mcq", "multi", "dropdown", "rating", "scale"].includes(q.type) &&
          (!q.options || !q.options.length)
        ) {
          throw new Error("Options are required for this question type");
        }

        //  Format options with scoring
        const formattedOptions = q.options
          ? q.options.map(option => {

              // Validate scores
              if (option.scores) {
                Object.keys(option.scores).forEach(key => {
                  if (!resultKeys.includes(key)) {
                    throw new Error(
                      `Invalid score key '${key}' in question '${q.questionText}'`
                    );
                  }
                });
              }

              return {
                label: option.text || option.label,
                value : option.value || option.text,
                scores: option.scores || {}
              };
            })
          : [];

        return {
          survey: survey._id,
          questionText: q.questionText,
          type: q.type,
          options: formattedOptions,
          required: q.required || false,
          order: q.order ?? index + 1
        };
      });

      createdQuestions = await Question.insertMany(formattedQuestions);
    }

    res.status(201).json({
      success: true,
      message: "Survey created successfully",
      survey,
      questions: createdQuestions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

// update survey 
// put  /api/surveys/:id

export const updateSurvey = async (req,res) => {
    try {
        const surveyId = req.params.id;

        if(!surveyId){
            return res.status(400).json({message : "Survey id is missing"});
        }
        
        const {title,description,isActive, results} = req.body;

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

         if (results !== undefined) {
      if (!Array.isArray(results) || results.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Results must be a non-empty array"
        });
      }

      // Validate result structure
      results.forEach(r => {
        if (!r.key || !r.title || !r.description) {
          throw new Error(
            "Each result must contain key, title and description"
          );
        }
      });

      survey.results = results;
    }


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
// POST /api/surveys/:id/questions
export const addQuestionToSurvey = async (req, res) => {
  try {
    const surveyId = req.params.id;
    if (!surveyId) {
      return res.status(400).json({
        success: false,
        message: "Survey ID is required"
      });
    }

    const {
      questionText,
      type,
      options,
      required,
      order
    } = req.body;

    /* =============================
       VALIDATIONS
    ============================== */

    if (!questionText || !type) {
      return res.status(400).json({
        success: false,
        message: "Question text and type are required"
      });
    }

    const allowedTypes = [
      "mcq",
      "multi",
      "dropdown",
      "rating",
      "scale",
      "text",
      "yesno"
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid question type: ${type}`
      });
    }

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found"
      });
    }

    // ❌ Prevent editing live surveys (best practice)
    if (survey.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot add questions to an active survey"
      });
    }

    /* =============================
       OPTION + SCORING VALIDATION
    ============================== */

    let formattedOptions = [];

    if (["mcq", "multi", "dropdown", "rating", "scale"].includes(type)) {
      if (!options || !Array.isArray(options) || options.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Options are required for this question type"
        });
      }

      // Validate scores against survey result keys
      const resultKeys = survey.results?.map(r => r.key) || [];

      formattedOptions = options.map((opt, index) => {
        if (!opt.text) {
          throw new Error(`Option text missing at index ${index}`);
        }

        if (opt.scores) {
          Object.keys(opt.scores).forEach(scoreKey => {
            if (!resultKeys.includes(scoreKey)) {
              throw new Error(
                `Invalid score key '${scoreKey}' in option '${opt.text}'`
              );
            }
          });
        }

        return {
          label: opt.text,
          value: opt.value ?? opt.text,
          scores: opt.scores || {}
        };
      });
    }

    /* =============================
       AUTO ORDERING
    ============================== */

    let questionOrder = order;

    if (!questionOrder) {
      const lastQuestion = await Question.findOne({ survey: surveyId })
        .sort({ order: -1 });

      questionOrder = lastQuestion ? lastQuestion.order + 1 : 1;
    }

    /* =============================
       CREATE QUESTION
    ============================== */

    const question = await Question.create({
      survey: surveyId,
      questionText,
      type,
      options: formattedOptions,
      required: required || false,
      order: questionOrder
    });

    return res.status(201).json({
      success: true,
      message: "Question added successfully",
      question
    });

  } catch (error) {
    console.error("Add Question Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};


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

    if (options) {
  question.options = options.map(opt => ({
    label: opt.label,
    value: opt.value,
    scores: opt.scores || {}
  }));
}
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

export const SubmitSurveyResponse = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { answers, email } = req.body;

    //  Validate survey
    const survey = await Survey.findById(surveyId);
    if (!survey || !survey.isActive) {
      return res.status(400).json({
        success: false,
        message: "Survey not found or not active"
      });
    }

    //  Validate answers
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Answers must be a non-empty array"
      });
    }

    //  Anonymous email check
    if (!req.user && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for anonymous users"
      });
    }

    //  Prevent duplicate submissions (optional but recommended)
    if (req.user) {
      const alreadySubmitted = await SurveyResponse.findOne({
        survey: surveyId,
        user: req.user._id
      });

      if (alreadySubmitted) {
        return res.status(400).json({
          success: false,
          message: "You have already submitted this survey"
        });
      }
    }

    //  Fetch questions
    const questions = await Question.find({ survey: surveyId });

    //  Required question validation
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

    //  Initialize score map
    const scoreMap = {};
    if (survey.results && Array.isArray(survey.results)) {
      survey.results.forEach(r => {
        scoreMap[r.key] = 0;
      });
    }

    //  Calculate scores
    for (let ans of answers) {
      const question = questions.find(
        q => q._id.toString() === ans.question.toString()
      );

      if (!question || !question.options || question.options.length === 0) {
        continue;
      }

      // Multi-select answers
      if (Array.isArray(ans.answer)) {
        ans.answer.forEach(val => {
          const option = question.options.find(
            o => o.value === val
          );
          if (option?.scores) {
            for (const [key, value] of option.scores.entries()) {
              scoreMap[key] += value;
            }
          }
        });
      }
      // Single answer
      else {
        const option = question.options.find(
          o => o.value === ans.answer
        );
        if (option?.scores) {
          for (const [key, value] of option.scores.entries()) {
            scoreMap[key] += value;
          }
        }
      }
    }

    //  Determine final result
    let finalResult = null;

    if (Object.keys(scoreMap).length > 0) {
      const sortedResults = Object.entries(scoreMap).sort(
        (a, b) => b[1] - a[1]
      );

      const resultKey = sortedResults[0][0];

      finalResult = survey.results.find(r => r.key === resultKey);
    }

    //  Save response
    const response = await SurveyResponse.create({
      survey: surveyId,
      user: req.user ? req.user._id : null,
      email: req.user ? null : email,
      answers,
      result: finalResult ? {
        key: finalResult.key,
        title: finalResult.title,
        description: finalResult.description,
        score: scoreMap[finalResult.key] || 0
      } : null,
      scoreMap: scoreMap
    });

    // Final response
    return res.status(200).json({
      success: true,
      message: "Survey submitted successfully",
      responseId: response._id,
      result: finalResult,
      scoreMap
    });

  } catch (error) {
    console.error("Submit Survey Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Unable to submit survey",
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


