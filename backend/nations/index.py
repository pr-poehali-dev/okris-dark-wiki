import json
import os

def handler(event: dict, context) -> dict:
    '''
    API для управления государствами на сервере.
    Позволяет получать список государств, информацию о конкретном государстве,
    его законы, министерства, суды и правителей.
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        if method == 'GET':
            return get_all_nations()
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Endpoint not found'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def get_all_nations() -> dict:
    nations = [
        {
            'id': 'emerald-kingdom',
            'name': 'Изумрудное Королевство',
            'flag_emoji': '🟢',
            'description': 'Древнее королевство, основанное на торговле изумрудами. Центр экономики сервера.',
            'reputation': 92,
            'population': 23,
            'territory_size': 450,
            'founded_date': '2025-06-15',
            'capital': 'Эмеральдия',
            'government_type': 'Конституционная монархия',
            'status': 'active'
        },
        {
            'id': 'shadow-empire',
            'name': 'Империя Теней',
            'flag_emoji': '🟣',
            'description': 'Таинственная империя, практикующая древнюю магию. Известна своими алхимиками.',
            'reputation': 68,
            'population': 18,
            'territory_size': 380,
            'founded_date': '2025-07-22',
            'capital': 'Обсидия',
            'government_type': 'Теократия',
            'status': 'active'
        },
        {
            'id': 'free-republic',
            'name': 'Вольная Республика',
            'flag_emoji': '🔵',
            'description': 'Демократическое государство, основанное на свободе и равенстве. Открыто для всех.',
            'reputation': 85,
            'population': 31,
            'territory_size': 520,
            'founded_date': '2025-05-10',
            'capital': 'Либерум',
            'government_type': 'Демократическая республика',
            'status': 'active'
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'nations': nations}, ensure_ascii=False),
        'isBase64Encoded': False
    }


def get_nation_detail(nation_id: str) -> dict:
    nations_data = {
        'emerald-kingdom': {
            'id': 'emerald-kingdom',
            'name': 'Изумрудное Королевство',
            'flag_emoji': '🟢',
            'description': 'Древнее королевство, основанное на торговле изумрудами',
            'reputation': 92,
            'population': 23,
            'territory_size': 450,
            'founded_date': '2025-06-15',
            'capital': 'Эмеральдия',
            'government_type': 'Конституционная монархия',
            'status': 'active',
            'full_description': 'Изумрудное Королевство — одно из старейших и наиболее процветающих государств на сервере Окрис.'
        }
    }
    
    nation = nations_data.get(nation_id)
    if not nation:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Nation not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(nation, ensure_ascii=False),
        'isBase64Encoded': False
    }


def get_nation_laws(nation_id: str) -> dict:
    laws = [
        {
            'id': '1',
            'title': 'Конституция Изумрудного Королевства',
            'type': 'constitution',
            'content': 'Основной закон государства...',
            'enacted_date': '2025-06-15'
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'laws': laws}, ensure_ascii=False),
        'isBase64Encoded': False
    }


def get_nation_ministries(nation_id: str) -> dict:
    ministries = [
        {
            'id': '1',
            'name': 'Министерство экономики',
            'icon': 'TrendingUp',
            'minister': 'TradeKing',
            'responsibilities': ['Управление казной', 'Регулирование торговли'],
            'budget': 15000
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ministries': ministries}, ensure_ascii=False),
        'isBase64Encoded': False
    }


def get_nation_courts(nation_id: str) -> dict:
    courts = [
        {
            'id': '1',
            'name': 'Королевский верховный суд',
            'judges': ['JusticeSeeker', 'LawKeeper'],
            'jurisdiction': 'Все категории дел',
            'cases_handled': 47
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'courts': courts}, ensure_ascii=False),
        'isBase64Encoded': False
    }


def get_nation_rulers(nation_id: str) -> dict:
    rulers = [
        {
            'nickname': 'EmeraldKing',
            'title': 'Король',
            'role': 'monarch',
            'term_start': '2025-06-15',
            'achievements': ['Основал королевство', 'Построил торговый центр']
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'rulers': rulers}, ensure_ascii=False),
        'isBase64Encoded': False
    }


def create_nation(data: dict) -> dict:
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Nation created successfully', 'id': 'new-nation-id'}),
        'isBase64Encoded': False
    }


def update_nation(nation_id: str, data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Nation updated successfully'}),
        'isBase64Encoded': False
    }


def update_nation_laws(nation_id: str, data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Laws updated successfully'}),
        'isBase64Encoded': False
    }


def update_nation_ministries(nation_id: str, data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Ministries updated successfully'}),
        'isBase64Encoded': False
    }


def update_nation_courts(nation_id: str, data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Courts updated successfully'}),
        'isBase64Encoded': False
    }


def update_nation_rulers(nation_id: str, data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Rulers updated successfully'}),
        'isBase64Encoded': False
    }


def delete_nation(nation_id: str) -> dict:
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Nation deleted successfully'}),
        'isBase64Encoded': False
    }