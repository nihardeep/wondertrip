from fastapi import FastAPI
from typing import Dict, Any, List

app = FastAPI()


def semantic_chunk_itinerary(itinerary: Dict[str, Any]) -> List[Dict[str, Any]]:
    chunks = []

    def add_chunk(content: str, metadata: Dict[str, Any]):
        if not content or not content.strip():
            return
        chunks.append({
            "content": content.strip(),
            "metadata": metadata
        })

    destination = itinerary.get("destination", {})
    itinerary_outline = itinerary.get("itinerary_outline", [])
    trip_type = itinerary.get("trip_type", [])

    base_metadata = {
        "destination_id": itinerary.get("destination_id"),
        "hotel_id": itinerary.get("hotel_id"),
        "trip_id": itinerary.get("trip_id"),
        "city": destination.get("city"),
        "country": destination.get("country"),
        "region": destination.get("region"),
        "trip_type": trip_type,
        "source": "llm_itinerary"
    }

    # OVERVIEW
    add_chunk(
        f"{itinerary.get('headline', '')}. {itinerary.get('description', '')}",
        {**base_metadata, "chunk_type": "overview"}
    )

    # DAYS
    for day in itinerary_outline:
        day_number = day.get("day")

        add_chunk(
            f"Day {day_number}: {day.get('title', '')}. {day.get('overview', '')}",
            {
                **base_metadata,
                "chunk_type": "day",
                "day": day_number,
                "time_of_day": day.get("time_of_day")
            }
        )

        # MEALS
        for meal_type, meal in day.get("meals", {}).items():
            if meal and meal.get("description"):
                add_chunk(
                    meal["description"],
                    {
                        **base_metadata,
                        "chunk_type": "meal",
                        "meal_type": meal_type,
                        "day": day_number,
                        "time_of_day": (
                            "morning" if meal_type == "breakfast"
                            else "afternoon" if meal_type == "lunch"
                            else "night"
                        )
                    }
                )

        # ACTIVITIES
        for activity in day.get("activities", []):
            if activity.get("description"):
                add_chunk(
                    activity["description"],
                    {
                        **base_metadata,
                        "chunk_type": "activity",
                        "activity": activity.get("name", "unknown"),
                        "day": day_number,
                        "time_of_day": day.get("time_of_day")
                    }
                )

        # DAY LOGISTICS
        if day.get("how_to_reach"):
            add_chunk(
                day["how_to_reach"],
                {
                    **base_metadata,
                    "chunk_type": "logistics",
                    "day": day_number
                }
            )

    # FALLBACK LOGISTICS
    if not any(c["metadata"]["chunk_type"] == "logistics" for c in chunks):
        add_chunk(
            f"The itinerary is designed to be explored comfortably within {destination.get('city')}, "
            f"with walking and public transport suitable for most locations.",
            {**base_metadata, "chunk_type": "logistics"}
        )

    return chunks


@app.post("/chunk")
def chunk_itinerary(itinerary: Dict[str, Any]):
    """
    API endpoint:
    Input  -> itinerary JSON
    Output -> semantic chunks
    """
    return semantic_chunk_itinerary(itinerary)
