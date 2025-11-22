"""
API Views for AI Comparator
"""
import json
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
from groq import Groq
import google.generativeai as genai


def get_groq_response(prompt):
    """Get response from Groq API"""
    if not settings.GROQ_API_KEY:
        return {
            'model': 'Groq',
            'response': 'API key not configured',
            'error': 'Please configure GROQ_API_KEY in .env file'
        }
    
    try:
        client = Groq(api_key=settings.GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
        )
        return {
            'model': 'Groq',
            'response': completion.choices[0].message.content,
            'timestamp': datetime.now().isoformat(),
        }
    except Exception as e:
        print(f'Groq error: {str(e)}')
        return {
            'model': 'Groq',
            'error': str(e),
            'response': 'Failed to get response from Groq',
        }


def get_gemini_response(prompt):
    """Get response from Gemini API"""
    if not settings.GEMINI_API_KEY:
        return {
            'model': 'Gemini',
            'response': 'API key not configured',
            'error': 'Please configure GEMINI_API_KEY in .env file'
        }
    
    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-flash-latest')
        result = model.generate_content(prompt)
        return {
            'model': 'Gemini',
            'response': result.text,
            'timestamp': datetime.now().isoformat(),
        }
    except Exception as e:
        print(f'Gemini error: {str(e)}')
        return {
            'model': 'Gemini',
            'error': str(e),
            'response': 'Failed to get response from Gemini',
        }


# API Endpoints
@require_http_methods(["GET"])
def health_check(request):
    """Health check endpoint"""
    return JsonResponse({
        'status': 'ok',
        'message': 'AI Comparator API is running'
    })

# for testing purposes and separate endpoints for each model
@csrf_exempt
@require_http_methods(["POST"])
def groq_view(request):
    """Groq endpoint"""
    try:
        data = json.loads(request.body)
        prompt = data.get('prompt')
        
        if not prompt:
            return JsonResponse({'error': 'Prompt is required'}, status=400)
        
        result = get_groq_response(prompt)
        status = 500 if result.get('error') else 200
        return JsonResponse(result, status=status)
        
    except Exception as e:
        return JsonResponse({
            'error': 'Failed to get response from Groq',
            'details': str(e)
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def gemini_view(request):
    """Gemini endpoint"""
    try:
        data = json.loads(request.body)
        prompt = data.get('prompt')
        
        if not prompt:
            return JsonResponse({'error': 'Prompt is required'}, status=400)
        
        result = get_gemini_response(prompt)
        status = 500 if result.get('error') else 200
        return JsonResponse(result, status=status)
        
    except Exception as e:
        return JsonResponse({
            'error': 'Failed to get response from Gemini',
            'details': str(e)
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def compare_view(request):
    """Compare endpoint - gets responses from all AIs"""
    try:
        data = json.loads(request.body)
        prompt = data.get('prompt')
        
        if not prompt:
            return JsonResponse({'error': 'Prompt is required'}, status=400)
        
        # Get responses from all models
        results = {
            'groq': get_groq_response(prompt),
            'gemini': get_gemini_response(prompt),
        }
        
        return JsonResponse(results)
        
    except Exception as e:
        print(f'Compare error: {str(e)}')
        return JsonResponse({
            'error': 'Failed to compare AI responses',
            'details': str(e)
        }, status=500)
