var category = '';
var questionPrompt = '';

$('#vocabQuiz').on('click', function() {
    category = 'Vocabulary';
    removeLanding();
    askChatGPT();
})

$('#tspQuiz').on('click', function() {
    category = 'Text Structure and Purpose';
    removeLanding();
    askChatGPT();
})

$('#cidQuiz').on('click', function() {
    category = 'Central Ideas and Details';
    removeLanding();
    askChatGPT();
})

$('#textualQuiz').on('click', function() {
    category = 'Textual Evidence';
    removeLanding();
    askChatGPT();
})

$('#inferencesQuiz').on('click', function() {
    category = 'Inferences';
    removeLanding();
    askChatGPT();
})

$('#boundariesQuiz').on('click', function() {
    category = 'Boundaries';
    removeLanding();
    askChatGPT();
})

$('#transitionsQuiz').on('click', function() {
    category = 'Transitions';
    removeLanding();
    askChatGPT();
})

function removeLanding() {
     $("#mainRemove").remove();
}

function askChatGPT() {
    switch(category) {
        case 'Vocabulary':
            questionPrompt = "Can you teach me how to dougie";
            sendRequest(questionPrompt);
            break;
        case 'Text Structure and Purpose':
            questionPrompt = "Whats 1+1";
            sendRequest(questionPrompt);
            break;
        case 'Central Ideas and Details':
            questionPrompt = "how do i eat food properly";
            sendRequest(questionPrompt);
            break;
        case 'Textual Evidence':
            questionPrompt = "do you also love the petting zoo? why";
            sendRequest(questionPrompt);
            break;
        case 'Inferences': 
            questionPrompt = "where should i go when im bored";
            sendRequest(questionPrompt);
            break;
        case 'Boundaries':
            questionPrompt = "whats the best music of all time";
            sendRequest(questionPrompt);
            break;
        case 'Transitions': 
            questionPrompt = "Write an SAT style question with four options using a short passage using one of any of the following options correctly: In other words, therefore, likewise, nevertheless (3), still, therefore, indeed, furthermore, similarly (2), finally, therefore, specifically (2), furthermore, still, consequently, next, hence, however, additionally, in comparison, for example, subsequently, besides, thus";
            sendRequest(questionPrompt);
            break;
    }
}

function sendRequest(questionPrompt) {
    // ChatGPT API endpoint URL and key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = 'sk-Prhln' + 'C3XR9TfFo6Tm4hA' + 'T3BlbkFJEL124rH' + 'TQ59iQTBniEQd'

    // Request payload and prompt ChatGPT to give a response appropriate to the context 
    const payload = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{
            role: 'system',
            content: ''
        }, {
            role: 'user',
            content: questionPrompt
        }],
        
        max_tokens: 1000,
        temperature: 0.7
    };
    
    $('#mainBox').attr('Class', 'questions')
    var loading = $('<h1>');
    $(loading).text('Loading...')
    $('#mainBox').append(loading); 

    //Makes the api call to ChatGPT
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        })

        .then(response => response.json())
        .then(data => {
            satQuestions = data.choices[0].message.content;
            $('#mainBox').removeClass('questions')            
            var mainBody = $('<main>', {id: 'mainRemove', class: 'questions'})
            $('#mainBox').append(mainBody)
            var mainText = $('<pre>')
            $(mainText).text(satQuestions)
            $(mainBody).append(mainText)
            $(loading).remove();
            // =============================================
            var divText = $('<h3>', {id: 'divText'});
            $(divText).text('Choose your answer here:');
            $(mainBody).append(divText)
            // =============================================
            var div = $('<div>', {id: 'divTest'});
            $(mainBody).append(div);
            var choiceA = $('<p>', {id: 'choiceA', style: 'width: 100px; text-align: center; font-weight: 900'})
            $(choiceA).text('A')
            $(div).append(choiceA)
            var choiceB = $('<p>', {id: 'choiceB', style: 'width: 100px; text-align: center; font-weight: 900'})
            $(choiceB).text('B')
            $(div).append(choiceB)
            var choiceC = $('<p>', {id: 'choiceC', style: 'width: 100px; text-align: center; font-weight: 900'})
            $(choiceC).text('C')
            $(div).append(choiceC)
            var choiceD = $('<p>', {id: 'choiceD', style: 'width: 100px; text-align: center; font-weight: 900'})
            $(choiceD).text('D')
            $(div).append(choiceD)
            // =============================================
            var choice = '';
            $('#choiceA').on('click', function() {
                choice = 'A'
                checkAnswer(satQuestions, choice)
            })
            $('#choiceB').on('click', function() {
                choice = 'B'
                checkAnswer(satQuestions, choice)
            })
            $('#choiceC').on('click', function() {
                choice = 'C'
                checkAnswer(satQuestions, choice)
            })
            $('#choiceD').on('click', function() {
                choice = 'D'
                checkAnswer(satQuestions, choice)
            })
        })
}


function checkAnswer(satQuestions, choice) {
    // ChatGPT API endpoint URL and key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = 'sk-Prhln' + 'C3XR9TfFo6Tm4hA' + 'T3BlbkFJEL124rH' + 'TQ59iQTBniEQd'

    // Request payload and prompt ChatGPT to give a response appropriate to the context 
    const payload = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{
            role: 'system',
            content: `The previous question was ${satQuestions}. Based on the response please let me know if its correct or not and please explain it in great detail why or why not each answer is correct.`
        }, {
            role: 'user',
            content: choice
        }],
        
        max_tokens: 1000,
        temperature: 0.7
    };
    
    $('#divText').text('Your answer was:');
    var yourAnswer = $('<p>', {style: 'width: 100px; text-align: center; font-weight: 900'})
    $(yourAnswer).text(choice)
    $('#choiceA').remove();
    $('#choiceB').remove();
    $('#choiceC').remove();
    $('#choiceD').remove();
    $('#divTest').append(yourAnswer)
    var loading = $('<h2>');
    $(loading).attr('Class', 'questions')
    $(loading).text('Checking Answer...')
    $('#mainBox').append(loading); 

    //Makes the api call to ChatGPT
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        })

        .then(response => response.json())
        .then(data => {
            answer = data.choices[0].message.content;
            $('#mainBox').removeClass('questions')            
            var mainBody = $('<main>', {id: 'secondRemove', class: 'questions'})
            $('#mainBox').append(mainBody)
            var mainText = $('<pre>')
            $(mainText).text(answer)
            $(mainBody).append(mainText)
            $(loading).remove();
            window.scrollTo({
                top: 600,
                behavior: "smooth",
              });
            var div = $('<div>', {id: 'divTest', style: 'padding-bottom: 20px; width: 100%'});
            $(mainBody).append(div);
            var question = $('<p>', {id: 'question', style: 'display: flex; align-items: center; width: 200px; height: 60px; justify-content: center; text-align: center; font-weight: 900'})
            $(question).text('Generate Another Question')
            $(div).append(question)
            var mainMenu = $('<p>', {id: 'mainMenu', style: 'display: flex; align-items: center; width: 200px; height: 60px; justify-content: center; text-align: center; font-weight: 900'})
            $(mainMenu).text('Main Menu')
            $(div).append(mainMenu)
            $(question).on('click', function() {
                $('#mainRemove').remove();
                $('#secondRemove').remove();
                askChatGPT();
            });
            $(mainMenu).on('click', function() {
                location.reload();
            })
        })
}